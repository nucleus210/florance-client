import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductRateService } from '../services/product.rate.service';
import { ProductReviewService } from '../services/product.review.service';
import { ProductService } from '../services/product.service';
import IProduct from '../shared/interfaces/product';
import Rate from '../shared/interfaces/product-rate';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  productId: number;
  productReviewForm: FormGroup;
  public product: IProduct | null = null;
  public productRate: Rate | null = null;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private productReviewService: ProductReviewService,
    private productRateService: ProductRateService) { }

  ngOnInit(): void {
    // Add param observer to route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id');
      console.log(this.productId)
    });

    // fech product entity from back-end service
    this.getProduct(this.productId);
    this.addProductRate(this.productId);
    this.writeProductReview(this.productId)
    this.getReviewsByProductIdAndUsername(this.productId)
  }
  getProduct(productId: number) {
    this.productService.getProductProjection(productId)
      .subscribe((product: IProduct) => {
        this.product = product;
        console.log(this.product);
      })
  }
  public addProductRate(event) {
    console.log(event);
    const newProductRate = new Rate();
    newProductRate.productRate = 5;
    newProductRate.username = 'admin';
    newProductRate.product = this.product;
    this.productRateService.addRate(
     newProductRate
    ).subscribe((createdProduct: Rate) => {
      // some logic 
    });
  }

  writeProductReview(productId: number) {
    this.productService.getProductProjection(productId)
      .subscribe((product: IProduct) => {
        this.product = product;
        console.log(this.product);
      })
  }
  getReviewsByProductIdAndUsername(productId: number) {
    this.productService.getProductProjection(productId)
      .subscribe((product: IProduct) => {
        this.product = product;
        console.log(this.product);
      })
  }
  public onProductReview() {

  }
}