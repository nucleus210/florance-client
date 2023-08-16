import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductRateService } from '../../../services/product.rate.service';
import { ProductReviewService } from '../../../services/product.review.service';
import { ProductService } from '../../../services/product.service';
import Product from '../../../shared/interfaces/product';
import Rate from '../../../shared/interfaces/product-rate';
import Review from '../../../shared/interfaces/review';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  [x: string]: any;
  @Output() readonly = new EventEmitter<boolean>();
  @Output() currentRate = new EventEmitter<number>();

  productRatePayload: any = {
    productRate: null,
    product: null,
    username: null
  }
  public ratesMap: Map<string, number> = new Map([["1", 0], ["2", 0], ["3", 0], ["4", 0], ["5", 0]]);
  public averageRate: number = 0;
  public rateCount: number | null = null;

  productReviewForm: any = {
    title: null,
    content: null
  };
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  public isReadOnly: boolean = false;
  public username: string = null;
  public productReview: Review | null = null;
  public productId: number;
  public product: Product | null = null;
  public productRate: Rate | null = null;
  public productRates: Rate[] | null = null;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private productReviewService: ProductReviewService,
    private productRateService: ProductRateService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.readonly.emit(true);
    this.isReadOnly = false;
    // Add param observer to route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id');
    });

    // fech product entity from back-end service
    this.username = this.authService.getUserName();
    this.getProduct(this.productId);
    // this.addProductRate(this.productId);
    this.getAllRatesByProductId(this.productId);
  }


  getProduct(productId: number) {
    this.productService.getProductById(productId)
      .subscribe((product: Product) => {
        this.product = product;
        console.log(this.product);
      })
  }
  onProductRate(event: any) {
    console.log(event.target.value);
    delete this.product['_links'];
    const newProductRate = new Rate();
    newProductRate.productRate = event.target.value;
    newProductRate.product = this.product;
    newProductRate.username = this.username;
    this.productRateService.createResource({ body: newProductRate }).subscribe((productRate: Rate) => {
      console.log('Succesfuly rate product ' + productRate);
    });
  }

  onSubmit() {
    const { title, content } = this.productReviewForm;

    let productReview = new Review();
    delete this.product['_links'];
    productReview.product = this.product;
    productReview.username = this.username;
    productReview.title = title;
    productReview.content = content;
    productReview.createdAt = new Date;
    productReview.publishedAt = new Date;

    this.productReviewService.createResource({ body: productReview })
      .subscribe((createReview: Review) => {
        this.productReview = createReview;
        console.log('Succesfuly added product review ' + this.productReview);
        this.router.navigate(['/api/products/' + this.productId]);
      });
  }

  getAllRatesByProductId(productId: number) {
    this.productRateService.searchRates('products/' + productId).subscribe({
      next: (collection: ResourceCollection<Rate>) => {
        let tmp = collection.resources;
        let countRates = 0;
        let averageRate = 0;
        tmp.forEach(element => {
          delete element['_links'];
          averageRate += element.productRate;
          countRates++;
          this.ratesMap.set(element.productRate.toString(), this.ratesMap.get(element.productRate.toString()) + 1);
          this.averageRate = averageRate / countRates;
          this.rateCount = countRates;
          this.currentRate.emit(Math.round(this.averageRate));
          this.readonly.emit(true);
        });
        this.productRates = tmp;
        console.log(this.productRates);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  /**
* function for rate product
*
* @param event Output rate value emited by RateComponent 
*/
  onRateSelected(event: any) {
    console.log('Parent: ' + event);
    delete this.product['_links']
    console.log(this.product);
    this.productRatePayload.product = this.product;
    this.productRatePayload.productRate = event;
    this.productRatePayload.username = this.username;
    this.productRateService.createResource({ body: this.productRatePayload })
      .subscribe({
        next: (productRateResponce: Rate) => {
          console.log(productRateResponce);

        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }
}

function ngOnDestroy() {
  throw new Error('Function not implemented.');

}