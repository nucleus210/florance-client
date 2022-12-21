import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Product from '../shared/interfaces/product';
import { ProductService } from '../services/product.service';
import { Resource, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import Order from '../shared/interfaces/order';
import { OrderStatusCodesService } from '../services/order.status.codes.service';
import OrderStatusCodes from '../shared/interfaces/order-status-codes';
import { OrderItemService } from '../services/order.item.service';
import OrderItem from '../shared/interfaces/order-item';
import { Router } from '@angular/router';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  private username: string;
  private order;
  public orderItemCount: number;
  public products: Product[] | null = null;
  public orders: Order[] | null = null;
  public basket = document.getElementById('basket');
  public basketNotify = this.basket.querySelector('span');
  public cardItemCount: number;

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService,
    private orderItemsService: OrderItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.username = this.authService.getUserName();
  }

  getProducts() {
    this.productService.getCollection().subscribe({
      next: (collection: ResourceCollection<Product>) => {
        const products: Array<Product> = collection.resources;
        this.products = products;
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  onAddToCard(event) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    const product = this.products.filter(function (element) { return element.productId == event.target.name });
    delete product[0]['_links']

    console.log(product[0]);
    if (this.order === undefined) {
      console.log(event.target.name);
      this.orderService.getOrderBySearchQuery('active/users/' + this.username).subscribe({
        next: (order: Order) => {
          this.order = order;
          delete this.order['_links'];
          console.log(this.order);
          this.addOrderItem(this.order, product[0]);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          const newOrder = new Order();
          newOrder.username = this.username;
          newOrder.orderStorderStatusCodeatusCode = null;
          newOrder.dateOrderPlaced = new Date();
          newOrder.orderDetails = 'new order details';
          this.orderService.createResource({ body: newOrder }).subscribe((createdOrder: Order) => {
            this.order = createdOrder;
            delete this.order['_links']
            console.log(this.order);
          });
        }
      });
    } else {
      console.log(this.order);
      this.addOrderItem(this.order, product[0]);
    }
    this.getCardItemCount().subscribe((count: number) => { this.orderItemCount = count; 
    console.log('Order Item Count: ' + this.orderItemCount)});

  }
  onAddToWatchlist(event) {
    alert('Comming soon ')
    console.log(event.target.name);
  }

  addOrderItem(order, product) {
    console.log(order);
    let orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.product = product;
    orderItem.orderItemStatusCode = null;
    orderItem.orderItemQuantity = 1;
    orderItem.orderItemPrice = product.unitSellPrice * orderItem.orderItemQuantity;
    orderItem.rmaNumber = '';
    orderItem.rmaIssuedBy = null;
    orderItem.rmaIssuedData = null;
    orderItem.orderItemDetails = '';
    console.log(orderItem);

    return this.orderItemsService
      .createResource({ body: orderItem })
      .subscribe({
        next: (createdOrderItem: OrderItem) => {
          console.log(createdOrderItem);
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }
  getCardItemCount() {
    return this.orderItemsService.getCardItemsCount(this.order.orderId);
  }
  updateBasket(orderIemCount){
    if (orderIemCount > 0) {
      this.basketNotify.textContent = orderIemCount;
      this.basketNotify.hidden = false;
      this.animateCSS(this.basketNotify, 'bounceIn','animate__');
  }
  }
  animateCSS(element, animation: string, prefix: string) {
    (element, animation, prefix)=>new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = element;

      node.classList.add(`${prefix}animated`, animationName);
       // When the animation ends, we clean the classes and resolve the Promise
       function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
});
  }

}
