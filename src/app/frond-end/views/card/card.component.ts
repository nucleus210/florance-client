import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpMethod, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AuthService } from '../../../services/auth.service';
import { OrderItemService } from '../../../services/order.item.service';
import { OrderService } from '../../../services/order.service';
import Order from '../../../shared/interfaces/order';
import OrderItem from '../../../shared/interfaces/order-item';
import Product from 'src/app/shared/interfaces/product';
import { UpdateCardBasketService } from 'src/app/services/update.card.basket.service';
import { OrderStatusCodesService } from 'src/app/services/order.status.codes.service';
import OrderStatusCodes from 'src/app/shared/interfaces/order-status-codes';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [UpdateCardBasketService]
})
export class CardComponent implements OnInit {
  [x: string]: any;
  public basket = document.getElementById('basket');
  public basketNotify = this.basket.querySelector('span');
  incomingData: number;
  totalItemsPrice = 0;
  shipingPrice = 0;
  discount = 0;
  itemCount = 0;
  items: OrderItem[] | null = null;
  public order: Order | null = null;
  public orderStatusCode: OrderStatusCodes | null = null;
  orderItemCount: number;
  constructor(private orderService: OrderService,
    private orderItemService: OrderItemService,
    private authService: AuthService,
    private updateCardBasketService: UpdateCardBasketService,
    private orderStatusCodesService: OrderStatusCodesService,
    private router: Router, 
    private change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getOrderByUsername('active/users/' + this.authService.getUserName());
  }
  ngOnDestroy() {
  }
  getOrderByUsername(searchQuery: string) {
    console.log(this.authService.getUserName());
    this.orderService.getOrderBySearchQuery(searchQuery).subscribe({
      next: (order: Order) => {
        this.order = order;
        console.log(this.order);
        if (this.order != null) {
          this.getAllOrderItemsByOrderId('orders/' + this.order.orderId);
        }
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }

  getAllOrderItemsByOrderId(searchQuery: string) {
    this.orderItemService.searchOrderItems(searchQuery).subscribe({
      next: (collection: ResourceCollection<OrderItem>) => {
        const orderItems: Array<OrderItem> = collection.resources;
        this.items = orderItems;
        this.calculateTotal(orderItems);
      },
      error: (error: HttpErrorResponse) => { alert(error.message); }
    });
  }

  /**
   * Method to calculate totals
   * @param {items} items ordered by user
   */
  calculateTotal(items: OrderItem[]) {

    let totalItemsPriceElement = document.getElementById('items-total-price');
    let shippingPriceElement = document.getElementById('shiping-total-price');
    let discountElement = document.getElementById('discount');
    let subTotalElement = document.getElementById('sub-total-price');
    totalItemsPriceElement.textContent = '';
    shippingPriceElement.textContent = '';
    discountElement.textContent = '';
    subTotalElement.textContent = '';
    this.totalItemsPrice = 0;
    this.shipingPrice = 0;
    this.discount = 0;
    items.forEach(element => {
      this.itemCount += 1;
      this.totalItemsPrice += element.orderItemPrice * element.orderItemQuantity;
      this.shipingPrice += element.product.productWeight * 5;
      this.discount += element.product.unitDiscount / this.itemCount;
    })
    totalItemsPriceElement.textContent = this.totalItemsPrice.toFixed(2);
    shippingPriceElement.textContent = this.shipingPrice.toFixed(2);
    discountElement.textContent = this.discount.toFixed(2);
    subTotalElement.textContent = ((this.totalItemsPrice + this.shipingPrice) - this.discount).toFixed(2);
  }
  /**
      * Method to handle item quantity change 
      * @param {e} event event from quantity input
      */
  onQuantityChange(event: any, productPayload: Product) {
    console.log(event.target.value);
    this.incomingData = event.target.value;

    const obj = this.order;
    delete obj['_links'];

    this.updateOrderItem(event.target.name, obj, productPayload, event.target.value);

    this.items.forEach(item => {
      if (item.orderItemId == event.target.name) {
        console.log('match');
        item.orderItemQuantity = event.target.value;
      }
    })
    this.calculateTotal(this.items);
  }

  checkOut() {
    this.orderStatusCodesService.customQuery(HttpMethod.GET, "/status-code/Pending-approval").subscribe({
      next: (orderStatusCode: OrderStatusCodes) => {
        delete orderStatusCode['_links'];
        this.orderStatusCode = orderStatusCode;
        this.order.orderStatusCode = orderStatusCode;
        console.log(this.orderStatusCode );
        delete this.order['_links'];
        console.log(this.order);
        this.updateOrder(this.order);
        this.updateCardBasketService.getCardItemCountAndUpdateBasket(this.order.orderId, this.basketNotify);
        this.router.navigate(['/api/home/']);
        this.change.detectChanges();
      },
      error: err => {
      }
    });
  }

  updateOrder(payload: Order) {
    this.orderService.customQuery(HttpMethod.PUT, '/' + payload.orderId, { body: payload }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        // handle error from server
        console.log(err);
      }
    });
  }

  onRemove(event: any) {
    let index = 0;
    this.orderItemService.deleteResourceById(event.target.name).subscribe(data => { console.log('Successfully deleted resource ' + data) });
    for (let i = 0; i > this.items.length; i++) {
      if (this.items[i].orderItemId == event.target.value) {
        break;
      }
      index++;

    }
    this.items.splice(index, 1);
    this.calculateTotal(this.items);
    this.updateCardBasketService.getCardItemCountAndUpdateBasket(this.order.orderId, this.basketNotify);

  }
  onWatchList(event: any) {
    console.log('In Progress');
  }
  /**
 * function for adding new order item
 *
 * @param order active user order object 
 * @param product selected product object from user
 */
  updateOrderItem(orderItemId: string, order: Order, product: Product, quantity: number) {
    // initialize new OrderItem object and populate fields with data
    let orderItem = new OrderItem();
    console.log(product);
    orderItem.order = order;
    orderItem.product = product;
    orderItem.orderItemStatusCode = null;
    orderItem.orderItemQuantity = quantity;
    orderItem.orderItemPrice = product.unitSellPrice * orderItem.orderItemQuantity;
    orderItem.rmaNumber = '';
    orderItem.rmaIssuedBy = null;
    orderItem.rmaIssuedData = null;
    orderItem.orderItemDetails = '';
    console.log(orderItem);
    console.log(order.orderId)

    this.orderItemService
      .customQuery(HttpMethod.PUT, orderItemId, { body: orderItem })
      .subscribe({
        next: (createdOrderItem: OrderItem) => {
          console.log(JSON.stringify(createdOrderItem));
          //update card items span text
          this.updateCardBasketService.getCardItemCountAndUpdateBasket(order.orderId, this.basketNotify);
          this.getAllOrderItemsByOrderId('orders/' + order.orderId);
          this.calculateTotal(this.items);
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }

}
