import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AuthService } from '../services/auth.service';
import { OrderItemService } from '../services/order.item.service';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import Order from '../shared/interfaces/order';
import OrderItem from '../shared/interfaces/order-item';
import IProduct from '../shared/interfaces/product';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  incomingData: number;
  totalItemsPrice = 0;
  shipingPrice = 0;
  discount = 0;
  itemCount = 0;
  items: OrderItem[] | null = null;
  public order: Order | null = null;
  constructor(private orderService: OrderService,
    private orderItemService: OrderItemService,
    private authService: AuthService) { }
  ngOnInit(): void {
    this.getOrderByUsername('active/users/' + this.authService.getUserName());
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
  calculateTotal(items) {

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
  onQuantityChange(event) {
    console.log(event.target.value);
    this.incomingData = event.target.value;
    console.log(event.target.name);
    console.log(this.items)
    this.items.forEach(item => {
      if (item.orderItemId == event.target.name) {
        console.log('match');
        item.orderItemQuantity = event.target.value;
      }
    })
    this.calculateTotal(this.items);
  }

  checkOut() {
    alert('In progress');
  }
  onRemove(event) {
    let index = 0;
    this.orderItemService.deleteResourceById(event.target.name).subscribe(data => { console.log('Successfully deleted resource ' + data) });
    for (let i = 0; i > this.items.length; i++) {
      if (this.items[i].orderItemId == event.target.name) {
        break;
      }
      index++;

    }
    this.items.splice(index, 1);
    this.calculateTotal(this.items);
  }
  onWatchList(event) {
    console.log('In Progress');
  }
}
