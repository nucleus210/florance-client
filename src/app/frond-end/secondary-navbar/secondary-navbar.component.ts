import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ProductCategoryService } from '../../services/product.category.service';
import { ProductSubCategoryService } from '../../services/product.sub.category.service';
import ProductCategory from '../../shared/interfaces/product-category';
import ProductSubCategory from '../../shared/interfaces/product-sub-category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  standalone: true,
  imports: [NgbCollapseModule ,CommonModule],
  styleUrls: ['./secondary-navbar.component.css']
})
export class SecondaryNavbarComponent implements OnInit {
	public isCollapsed = true;
  public username: string = null;
  public productCategory: ProductCategory | null = null;
  public productSubCategory: ProductSubCategory | null = null;
  public productCategories: ProductCategory[] | null = null;
  public productSubCategories: ProductSubCategory[] | null = null;;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productCategoryService: ProductCategoryService,
    private productSubCategoryService: ProductSubCategoryService,
    private authService: AuthService,
    private dataservice: DataService) { }
    public secNavOpt: Map<string, string> = new Map([
      ["", ""]]);


  ngOnInit(): void {
    // fech product categories from back-end service
    this.username = this.authService.getUserName();
    this.getAllProductCategories();
    this.initializeColorOptions();
    this.initializeSizeOptions();
    this.initializePriceOptions();
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
    * function for getting all product sub categories by product category name.
    *
    * @param productCategoryName product category name
    * @throws http error
    */
  getAllProductSubCategoriesByCategoryName(productCategoryName: string) {
    this.productSubCategoryService.searchSubCategories('category-name/' + productCategoryName).subscribe({
      next: (collection: ResourceCollection<ProductSubCategory>) => {
        const productSubCategories: Array<ProductSubCategory> = collection.resources;
        this.productSubCategories = productSubCategories;
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  onSelectSortingOption(event:any) {
    console.log('selected option ' + event.target.value);
    this.secNavOpt.set("sortOpt", event.target.id)
    this.dataservice.genericProviderHandler(this.secNavOpt, 'sortOpt');
    this.secNavOpt.clear();
  }
  productCategoryClickHandler(event: any) {
    console.log('clicked category ' + event.target.id);
    this.productSubCategories = [];
    this.getAllProductSubCategoriesByCategoryName(event.target.id);
    this.secNavOpt.set("product-category-opt", event.target.id)
    this.dataservice.genericProviderHandler(this.secNavOpt, 'product-category-opt');
    this.secNavOpt.clear();

  }
  productSubCategoryClickHandler(event: any) {
    console.log('clicked sub category ' + event.target.id);
    this.secNavOpt.set("product-sub-category-opt", event.target.id)
    this.dataservice.genericProviderHandler(this.secNavOpt, 'product-sub-category-opt');
    this.secNavOpt.clear();

  }
  productColorOptionClickHandler(event: any) {
    console.log('clicked color option ' + event.target.title);
    this.secNavOpt.set("product-color-opt", event.target.id)
    this.dataservice.genericProviderHandler(this.secNavOpt, 'product-color-opt');
    this.secNavOpt.clear();

    if (event.target.classList.contains('active')) {
      event.target.classList = '';
    } else {
      event.target.classList = 'active';
    }
  }
  productSizeOptionClickHandler(event: any) {
    console.log('clicked size option ' + event.target.title);
    this.secNavOpt.set("product-size-opt", event.target.id)
    this.dataservice.genericProviderHandler(this.secNavOpt, 'product-size-opt');
    this.secNavOpt.clear();

    if (event.target.classList.contains('active')) {
      event.target.classList = '';
    } else {
      event.target.classList = 'active';
    }
  }
  productPriceOptionClickHandler(event: any) {
    console.log('clicked price option ' + event.target.title);
    this.secNavOpt.set("product-price-opt", event.target.title)
    this.dataservice.genericProviderHandler(this.secNavOpt, 'product-price-opt');
    this.secNavOpt.clear();

    if (event.target.classList.contains('active')) {
      event.target.classList = '';
    } else {
      event.target.classList = 'active';
    }
  }
  initializeColorOptions() {
    let colorOptionRootElement = document.getElementById('color-options') as HTMLUListElement;
    let childColorOptionElements = colorOptionRootElement.querySelectorAll('a');
    childColorOptionElements.forEach(element => {
      element.addEventListener('click', (event) => {
        this.productColorOptionClickHandler(event);
      })
    })
  }
  initializeSizeOptions() {
    let sizeOptionRootElement = document.getElementById('size-options') as HTMLUListElement;
    let childSizeOptionElements = sizeOptionRootElement.querySelectorAll('a');
    childSizeOptionElements.forEach(element => {
      element.addEventListener('click', (event) => {
        this.productSizeOptionClickHandler(event);
      })
    })
  }
  initializePriceOptions() {
    let priceOptionRootElement = document.getElementById('price-options') as HTMLUListElement;
    let childPriceOptionElements = priceOptionRootElement.querySelectorAll('a');
    childPriceOptionElements.forEach(element => {
      element.addEventListener('click', (event) => {
        this.productPriceOptionClickHandler(event);
      })
    })
  }
}