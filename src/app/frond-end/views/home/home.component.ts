import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ProductCategoryService } from 'src/app/services/product.category.service';
import { ProductService } from 'src/app/services/product.service';
import Product from 'src/app/shared/interfaces/product';
import ProductCategory from 'src/app/shared/interfaces/product-category';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit {
  username: string;
  public products: Product[] = [];
  public slideItem: any[] = [];
  public sliderItems: any[] = [];
  public productCategories: ProductCategory[] | null = null;

  constructor(private productCategoryService: ProductCategoryService,
    private productService: ProductService, 
    private router: Router,
    private authService: AuthService){}
    paused = false;
    unpauseOnArrow = false;
    pauseOnIndicator = false;
    pauseOnHover = true;
    pauseOnFocus = true;
  
    @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  
  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.getAllProductsByProductCategoryName("flowers")
    this.getAllProductCategories();
    this.createSlides();
  }

createSlides() {
  for (let i = 0; i < this.products.length; i++){
    this.slideItem.push(this.products[i]);
    if(i%3 == 0){
      this.sliderItems.push(this.slideItem);
      this.slideItem = [];
    }
  }
}

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}
  /**
   * function for carousel slider events.
   *
   * @param slideEvent control event
   */
	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
    /**
   * function for getting all product categories.
   *
   * @param order user active order object
   * @throws http error
   */
    getAllProductCategories() {
      this.productCategoryService.getAllCategories().subscribe({
        next: (collection: ResourceCollection<ProductCategory>) => {
          const productCategories: Array<ProductCategory> = collection.resources;
          this.productCategories = productCategories;
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
    getAllProductsByProductCategoryName(productCategoryName: String) {
      this.productService.searchCollection('categories/' + productCategoryName).subscribe({
        next: (collection: ResourceCollection<Product>) => {
          const products: Array<Product> = collection.resources;
          this.products = products;
         this.products.forEach(function (element) {  delete element['_links'];

        });
          this.createSlides();
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
    }

    showNowBtn(event: any) {
      this.router.navigate(['/api/product-list/']);
    }

    shopBtn(event: any) {
      this.router.navigate(['/api/products/' + event.target.name]);
    }
}
