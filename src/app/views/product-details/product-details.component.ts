import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Product from '../../shared/interfaces/product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import Question from '../../shared/interfaces/question';
import Answer from '../../shared/interfaces/answer';
import Review from '../../shared/interfaces/review';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductReviewService } from '../../services/product.review.service';
import { ProductAnswerService } from '../../services/product.answer.service';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ProductQuestionService } from '../../services/product.question.service';
import Order from '../../shared/interfaces/order';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { OrderItemService } from '../../services/order.item.service';
import OrderItem from '../../shared/interfaces/order-item';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'products/:id',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
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
    private change: ChangeDetectorRef) { }
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
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy ');   
    this.product = null;
    this.questions = null;
    this.answers = null;
    this.reviews = null;
    this.order = null;
  };


  getReviewsByProductId(productId: number) {
    this.productReviewService.searchReviews('products/' + productId).subscribe({
      next: (collection: ResourceCollection<Review>) => {
        const reviews: Array<Review> = collection.resources;
        console.log('Reviews: ');
        this.reviews = reviews;
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  getProduct(productId: number) {
    this.productService.getProductById(productId)
      .subscribe((product: Product) => {
        this.product = product;
        console.log(this.product);
      })
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
      this.router.navigate(['/login']);
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
    this.router.navigate(['/product-review', this.productId]);
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


    //  if (question.question == '') {
    //    return alert('All fields are required!');
    //  }

    this.productQuestionService.createResource({ body: question })
      .subscribe((createQuestion: Question) => {
        console.log(createQuestion);
        this.getAllQuestionsByProductId(this.productId);
        console.log('Succesfully added product question' + question.question);
        this.router.navigate(['/products/' + this.productId]);
      });
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
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

