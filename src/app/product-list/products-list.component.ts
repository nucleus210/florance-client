import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Product from '../shared/interfaces/product';
import { ProductService } from '../services/product.service';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import Order from '../shared/interfaces/order';
import { OrderItemService } from '../services/order.item.service';
import OrderItem from '../shared/interfaces/order-item';
import { Router } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  public username: string;
  public order: Order | null = null;
  public orderItemCount: number;
  public product: Product | null = null;
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
    this.getActiveOrder(this.username);

  }
  /**
   * function for getting ordered items count.
   *
   * @param order user active order object
   * @param entities one or more entities that should be added to the resource collection
   * @throws error when required params are not valid or link not found by relation name
   */
  getProducts() {
    this.productService.getCollection().subscribe({
      next: (collection: ResourceCollection<Product>) => {
        const products: Array<Product> = collection.resources;
        this.products = products;
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  /**
   * function for getting ordered items count.
   *
   * @param order user active order object
   * @param entities one or more entities that should be added to the resource collection
   * @throws error when required params are not valid or link not found by relation name
   */
  onAddToCard(event: any) {
    if (!this.authService.isLoggedIn()) {
      // user is not logged in and redirect to login page
      this.router.navigate(['/login']);
    }
    // get clicked product from array
    this.product = this.products.find(function (element) { return element.productId == event.target.name; });
    delete this.product['_links'];

    if (this.order == null) {
      // create new order
      this.createNewOrder(this.username);
    } else {
      // add new orderItem to order
      this.addOrderItem(this.order, this.product);
    }

  }
  onAddToWatchlist(event: any) {
    alert('Comming soon ')
    console.log(event.target.name);
  }
  /**
   * function for adding new order item
   *
   * @param order active user order object 
   * @param product selected product object from user
   */
  addOrderItem(order: Order, product: Product) {
    // initialize new OrderItem object and populate fields with data
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

    this.orderItemsService
      .createResource({ body: orderItem })
      .subscribe({
        next: (createdOrderItem: OrderItem) => {
          console.log(createdOrderItem);
          //update card items span text
          this.getCardItemCount(order);

        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }
  /**
   * function for getting active user order object
   *
  * @param username logged username for token
  * @returns object of active user order inside subscription
   */
  getActiveOrder(username: string) {
    this.orderService.getOrderBySearchQuery('active/users/' + username).subscribe({
      next: (order: Order) => {
        delete order['_links'];
        // update active order variable
        this.order = order;
        //update card items span text
        this.getCardItemCount(order);
        console.log(order);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }
  /**
  * function for creating new order in database
  * @param username logged username for token
  * @returns object of created order inside subscription
  */
  createNewOrder(username: string) {
    // create new draft order object and populate with data
    const newOrder = new Order();
    newOrder.username = this.username;
    newOrder.dateOrderPlaced = new Date();
    newOrder.orderDetails = 'new order details';
    // post object to api
    this.orderService.createResource({ body: newOrder }).subscribe((createdOrder: Order) => {
      this.order = createdOrder;
      delete createdOrder['_links'];
      this.addOrderItem(createdOrder, this.product);
      console.log(this.order);
    });
  }
  /**
   * function for getting ordered items count.
   *
   * @param order user active order object
   * @param entities one or more entities that should be added to the resource collection
   * @throws error when required params are not valid or link not found by relation name
   */
  getCardItemCount(order: Order) {
    this.orderItemsService.getCardItemsCount(order.orderId)
      .subscribe((count: number) => {
        this.orderItemCount = count;
        this.updateBasket(count);
        console.log('Order Item Count: ' + count)
      });

  }
  /**
 * function for updating based span text
 *
 * @param order user active order object
 * @param entities one or more entities that should be added to the resource collection
 * @throws error when required params are not valid or link not found by relation name
 */
  updateBasket(orderIemCount: number) {
    if (orderIemCount > 0) {
      this.basketNotify.textContent = orderIemCount.toString();
      this.basketNotify.hidden = false;
      this.animateCSS(this.basketNotify, 'bounceIn', 'animate__');
    }
  }
  animateCSS(element: any, animation: string, prefix: string) {
    (element, animation, prefix) => new Promise((resolve, reject) => {
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
