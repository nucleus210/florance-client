import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import Product from '../../../shared/interfaces/product';
import { ProductService } from '../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import Question from '../../../shared/interfaces/question';
import Answer from '../../../shared/interfaces/answer';
import Review from '../../../shared/interfaces/review';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductReviewService } from '../../../services/product.review.service';
import { ProductAnswerService } from '../../../services/product.answer.service';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ProductQuestionService } from '../../../services/product.question.service';
import Order from '../../../shared/interfaces/order';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { OrderItemService } from '../../../services/order.item.service';
import OrderItem from '../../../shared/interfaces/order-item';
import { UpdateCardBasketService } from 'src/app/services/update.card.basket.service';

@Component({
  selector: 'products/:id',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [UpdateCardBasketService]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public basket = document.getElementById('basket');
  public basketNotify = this.basket.querySelector('span');
  username: string;
  productId: number;
  isSuccessful: boolean = false;
  answerForm: any = {
    questionId: null,
    username: null,
    productId: null,
    answers: null
  };
  questionForm: any = {
    question: null,
    productId: null
  };
  isAskQuestionCollapsed: boolean = true;
  public orderItemCount: number;
  public product: Product | null = null;
  public order: Order | null = null;
  public answers: Answer[] | null = null;
  public reviews: Review[] | null = null;
  public questions: Question[] | null = null;
  public averageRate: number | null = null;
  public rateCount: number | null = null;
  public ratesMap: Map<string, number> =
    new Map([
      ["1", 0],
      ["2", 0],
      ["3", 0],
      ["4", 0],
      ["5", 0]
    ]);

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productReviewService: ProductReviewService,
    private productQuestionService: ProductQuestionService,
    private productAnswerService: ProductAnswerService,
    private orderService: OrderService,
    private orderItemsService: OrderItemService,
    private change: ChangeDetectorRef,
    private updateCardBasketService: UpdateCardBasketService) { }

  ngOnInit(): void {
    // Add param observer to route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id');
      console.log(this.productId)
    });
    // fech product entity from back-end service
    this.username = this.authService.getUserName();
    this.getProduct(this.productId);
    this.getReviewsByProductId(this.productId)
    this.getAllQuestionsByProductId(this.productId);
    this.getActiveOrder(this.username);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy ');
    this.product = null;
    this.questions = null;
    this.answers = null;
    this.reviews = null;
    this.order = null;
  };

  getProduct(productId: number) {
    this.productService.getProductById(productId)
      .subscribe((product: Product) => {
        this.product = product;
        console.log(this.product);
      })
  }

  getReviewsByProductId(productId: number) {
    this.productReviewService.searchReviews('products/' + productId).subscribe({
      next: (collection: ResourceCollection<Review>) => {
        const reviews: Array<Review> = collection.resources;
        this.reviews = reviews;
        console.log('Reviews: ' + this.reviews);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }

  getAllQuestionsByProductId(productId: number) {
    this.productQuestionService.searchQuestions('products/' + productId).subscribe({
      next: (collection: ResourceCollection<Question>) => {
        // const questions: Array<Question> = 
        this.questions = collection.resources;
        console.log(this.questions);
        this.change.detectChanges();
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  getAnswersByQuestionId(questionId: number) {
    this.productAnswerService.searchAnswers('questions/' + questionId).subscribe({
      next: (collection: ResourceCollection<Answer>) => {
        const answers: Array<Answer> = collection.resources;
        this.answers = answers;
        console.log(answers);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  onAddToCard(event: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/api/login']);
    }
    delete this.product['_links'];
    if (this.order === null) {
      console.log(event.target.name);
      this.orderService.getOrderBySearchQuery('active/users/' + this.username).subscribe({
        next: (order: Order) => {
          this.order = order;
          delete this.order['_links'];
          console.log(this.order);
          this.addOrderItem(this.order, this.product);
          this.updateCardBasketService.getCardItemCountAndUpdateBasket(order.orderId, this.basketNotify);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          const newOrder = new Order();
          newOrder.username = this.username;
          newOrder.orderStatusCode = null;
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
      this.addOrderItem(this.order, this.product);
    }

  }

  onAddToWatchlist(event: any) {
    alert('Comming soon ')
    console.log(event.target.name);
  }

  public onReplace(str: Date) {
    return str.toLocaleString().replace(/T/, ' ').replace(/\..+/, '')

  }
  public onWriteReview(event: any) {
    console.log('onWriteReview' + event);
    this.router.navigate(['/api/product-review', this.productId]);
  }

  public onWriteAnswer(question: Question) {
    console.log('onWriteAnswer');
    const answer = this.answerForm;
    answer.questionId = question.questionId;
    answer.productId = this.product.productId;
    console.log(answer);

    console.log(question);
    if (answer.answer == '') {
      return alert('All fields are required!');
    }
    this.productAnswerService.createResource({ body: answer })
      .subscribe((createdAnswer: Answer) => {
        console.log(createdAnswer)
        console.log('Succesfuly added answer ' + answer.answer);
        this.questions = undefined;
        this.change.detectChanges();
        console.log('Succesfuly added answer and reset questions' + this.questions);
        this.getAllQuestionsByProductId(this.productId);
      });
    // this.router.navigate(['/products/' + this.productId]);
  }

  public onAskQuestion() {
    console.log('onAskQuestion');
    console.log(this.product)
    delete this.product['_links'];
    let question = this.questionForm;
    question.productId = this.product.productId;

    this.productQuestionService.createResource({ body: question })
      .subscribe((createQuestion: Question) => {
        console.log(createQuestion);
        this.getAllQuestionsByProductId(this.productId);
        console.log('Succesfully added product question' + question.question);
        this.router.navigate(['/api/products/' + this.productId]);
      });
  }
  /**
      * Method to handle item quantity change 
      * @param {e} event event from quantity input
      */
  onQuantityChange(event: any, productPayload: Product) {
    console.log(event.target.value);
    console.log(event.target.name);

    const obj = this.order;
    delete obj['_links'];

    // this.addOrderItem(event.target.name, obj);

  }

  addOrderItem(order: Order, product: Product) {
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
          //update card items span text
          this.updateCardBasketService.getCardItemCountAndUpdateBasket(order.orderId, this.basketNotify);
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
      if(this.username == null || username === undefined) {
        return;
      }
      this.orderService.getOrderBySearchQuery('active/users/' + username).subscribe({
        next: (order: Order) => {
          delete order['_links'];
          // update active order variable
          this.order = order;
          //update card items span text
          this.updateCardBasketService.getCardItemCountAndUpdateBasket(order.orderId, this.basketNotify);
          console.log(order);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      });
    }
  }

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

