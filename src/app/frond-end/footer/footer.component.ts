import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ProductCategoryService } from '../../services/product.category.service';
import ProductCategory from '../../shared/interfaces/product-category';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit{
  public productCategories: ProductCategory[] | null = null;

  constructor(private productCategoryService: ProductCategoryService){

  }
  ngOnInit(): void {
    this.getAllProductCategories();
    }
  getProductCategories() {
  }
  ngAfterViewInit(): void {
  }
  /**
    * function for feching all product categories from database.
    *
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
}
