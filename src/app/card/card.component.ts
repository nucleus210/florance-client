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
        console.log( this.order);
        if(this.order != null) {
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
      },
      error: (error: HttpErrorResponse) => { alert(error.message); }
    });
  }
}
