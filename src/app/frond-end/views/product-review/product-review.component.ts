import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductRateService } from '../../../services/product.rate.service';
import { ProductReviewService } from '../../../services/product.review.service';
import { ProductService } from '../../../services/product.service';
import Product from '../../../shared/interfaces/product';
import Rate from '../../../shared/interfaces/product-rate';
import Review from '../../../shared/interfaces/review';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  productReviewForm: any = {
    title: null,
    content: null
  };
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  public username: string = null;
  public productReview: Review | null = null;
  public productId: number;
  public product: Product | null = null;
  public productRate: Rate | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private productReviewService: ProductReviewService,
    private productRateService: ProductRateService,
    private authService: AuthService) { }


  ngOnInit(): void {
    // Add param observer to route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id');
      console.log(this.productId)
    });

    // fech product entity from back-end service
    this.username = this.authService.getUserName();
    this.getProduct(this.productId);
    this.addProductRate(this.productId);
  }
  getProduct(productId: number) {
    this.productService.getProductById(productId)
      .subscribe((product: Product) => {
        this.product = product;
        console.log(this.product);
      })
  }
  public addProductRate(event) {
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
        this.router.navigate(['/products/' + this.productId]);
      });
  }
}