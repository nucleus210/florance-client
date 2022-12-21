import { Component, OnInit } from '@angular/core';
import IProduct from '../shared/interfaces/product';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import Question from '../shared/interfaces/question';
import Answer from '../shared/interfaces/answer';
import Review from '../shared/interfaces/review';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import ProductViewModel from '../shared/interfaces/product-view-model';
import { ProductReviewService } from '../services/product.review.service';
import { ProductAnswerService } from '../services/product.answer.service';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ProductQuestionService } from '../services/product.question.service';

@Component({
  selector: 'products/:id',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  answerForm: FormGroup;
  questionForm: FormGroup;
  public product: IProduct | null = null;
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

  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private productReviewService: ProductReviewService,
              private productQuestionService: ProductQuestionService,
              private productAnswerService: ProductAnswerService, 
              private router: Router) { }
  ngOnInit(): void {
    // Add param observer to route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id');
      console.log(this.productId)
    });
    // fech product entity from back-end service
    this.getProduct(this.productId);
    this.getReviewsByProductId(this.productId.toString())
    this.answerForm = new FormGroup({});
    this.questionForm = new FormGroup({});

  }
  getReviewsByProductId(productId: string) {
    this.productReviewService.searchReviewProjectionsByProductId(productId).subscribe({next: (collection: ResourceCollection<Review>) => {
      const reviews: Array<Review> = collection.resources;
      console.log('Reviews: ' + reviews);
      this.reviews = reviews;
    },
    error: (error: HttpErrorResponse) => {  console.log(error.message); }
  });
}
  getProduct(productId: number) {
    this.productService.getProductProjection(productId)
      .subscribe((product: IProduct) => {
        this.product = product;
        console.log(this.product);
      })
  }
  getAllQuestionsByProductId() {

  }
  getAnswersByQuestionId() {

  }
  public onCardItemAdd(event) {
    const itemQuantity = document.getElementById('item-quantity') as HTMLInputElement | null;;

    console.log('Open ' + event + itemQuantity?.value);
  }
  public onWatchListItemAdd(event) {
    console.log('Open ' + event);
  }
  public onReplace(str: Date) {
    return str.toLocaleString().replace(/T/, ' ').replace(/\..+/, '')

  }
  public onWriteReview(event) {
    console.log('onWriteReview' + event);
    this.router.navigate(['/product-review', this.productId]);
  }

  public onWriteAnswer() {
     console.log('onWriteAnswer');
  }

  public onAskQuestion() {
     console.log('onAskQuestion');
  }
}
