import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AuthService } from '../services/auth.service';
import { ProductCategoryService } from '../services/product.category.service';
import { ProductService } from '../services/product.service';
import { ProductSubCategoryService } from '../services/product.sub.category.service';
import Order from '../shared/interfaces/order';
import Product from '../shared/interfaces/product';
import ProductCategory from '../shared/interfaces/product-category';
import ProductStatus from '../shared/interfaces/product-status';
import ProductSubCategory from '../shared/interfaces/product-sub-category';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  public isSuccessful: boolean = false;
  public username: string;
  public order: Order | null = null;
  public orderItemCount: number;
  public product: Product | null = null;
  public products: Product[] | null = null;
  public productStatuses: ProductStatus[] | null = null;
  public productCategories: ProductCategory[] | null = null;
  public productSubCategories: ProductSubCategory[] | null = null;

  public orders: Order[] | null = null;
  public basket = document.getElementById('basket');
  public basketNotify = this.basket.querySelector('span');
  public cardItemCount: number;

  constructor(private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productSubcategoriesService: ProductSubCategoryService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.getAllProductCategories();
  }
  /**
   * function for upload image to database.
   *
   * @param event click event
   * @throws error when required params are not valid or link not found by relation name
   */
  onUploadImage(event: any) {

  }
  /**
 * function for upload multiple images to database.
 *
 * @param event click event
 * @throws error when required params are not valid or link not found by relation name
 */
  onUploadImages(event: any) {

  }
  /**
  * function for adding new product to database.
  *
  * @param event click event
  * @throws error when required params are not valid or link not found by relation name
  */
  onProductSubmit() {

  }

  /**
* function for adding color to product form.
*
* @param event click event
* @throws error when required params are not valid or link not found by relation name
*/
  onColorAdd(event: any) {

  }
  /**
  * function for selecting category option for product form.
  *
  * @param event click event
  * @throws error when required params are not valid or link not found by relation name
  */
  onCategoryChange(event: any) {
    // get selected category option when change listener is executed
    const selectedOption = event.target.options[event.target.selectedIndex].text;
    // fetch subcategory data from server for selected category
    this.getAllSubCategoriesByCategoryName(selectedOption);
    // console.log(subCategories);
    // check that data is avaible
    if (this.productSubCategories != undefined) {
      // initialize array with subcategories objects from hateous
      this.productSubCategories = this.productSubCategories;
      // console.log(subCategories);
    } else {
      // else empty subcategories array
      this.productSubCategories = [];
    }
  }
  /**
    * function for submiting new product supplier to database.
    *
    * @param event click event
    * @throws error when required params are not valid or link not found by relation name
    */
  onSupplierSubmit(event: any) {

  }

  openLogoFile(event: any) {

  }
  /**
 * function for getting ordered items count.
 *
 * @param order user active order object
 * @param entities one or more entities that should be added to the resource collection
 * @throws error when required params are not valid or link not found by relation name
 */
  getAllProductCategories() {
    this.productCategoryService.getCollection().subscribe({
      next: (collection: ResourceCollection<ProductCategory>) => {
        const productCategories: Array<ProductCategory> = collection.resources;
        this.productCategories = productCategories;
        console.log(productCategories);
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
  getAllSubCategoriesByCategoryName(productCategoryName: string) {
    this.productSubcategoriesService.getCollection().subscribe({
      next: (collection: ResourceCollection<ProductSubCategory>) => {
        const productSubCategories: Array<ProductSubCategory> = collection.resources;
        this.productSubCategories = productSubCategories;
        console.log(productSubCategories);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
}
