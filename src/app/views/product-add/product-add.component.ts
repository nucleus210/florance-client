import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ResourceCollectionHttpService } from '@lagoshny/ngx-hateoas-client/lib/service/internal/resource-collection-http.service';
import { AuthService } from '../../services/auth.service';
import { ProductCategoryService } from '../../services/product.category.service';
import { ProductService } from '../../services/product.service';
import { ProductStatusService } from '../../services/product.status.service';
import { ProductSubCategoryService } from '../../services/product.sub.category.service';
import Order from '../../shared/interfaces/order';
import Product from '../../shared/interfaces/product';
import ProductCategory from '../../shared/interfaces/product-category';
import ProductStatus from '../../shared/interfaces/product-status';
import ProductSubCategory from '../../shared/interfaces/product-sub-category';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  form: any = {
    productName: null,
    productWeight: null,
    productSize: null,
    unitMeasure: null,
    unitQuantity: null,
    unitSellPrice: null,
    unitOrderPrice: null,
    unitDiscount: null,
    otherProductDetails: null,
    productDescription: null,
  };
  isSignUpFailed: boolean = false;
  errorMessage: string = '';
  public isSuccessful: boolean = false;
  public username: string;
  public order: Order | null = null;
  public orderItemCount: number;
  public product: Product | null = null;
  public products: Product[] | null = null;
  public productStatuses: ProductStatus[] | null = null;
  public productCategories: ProductCategory[] | null = null;
  public productSubCategories: ProductSubCategory[] | null = null;
  public storages: Storage[] | null = null;
  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;
  carouselItemView: any[] = [];

  constructor(private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productSubcategoriesService: ProductSubCategoryService,
    private productStatusService: ProductStatusService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.getAllProductCodeStatuses();
    this.getAllProductCategories();
  }

  /**
    * function for updating product images array and load data to img elements from input field
    * 
    * @param event handle event for input element file parameter
    */
  onSelectFile(event: any) {
    console.log("onUploadImage");
    let fileElementInput = document.getElementById('fileUpload') as HTMLInputElement | null;
    fileElementInput.value = '';
    fileElementInput.files = null;
    console.log(fileElementInput.nodeName)
    fileElementInput.click();

  }
  /**
    * function for updating product images array and load data to img elements from input field
    *
    * @param event handle event from input element files parameter
    */
  onSelectFiles(event: any) {
    let filesElement = document.getElementById('files-upload') as HTMLInputElement | null;
    filesElement.value = '';
    filesElement.files = null;
    filesElement.click();
  }
  /**
    * function that handle on change input element
    *
    * @param event handle change event from input element file parameter
    */
  onUpdateImageElement(event: any) {
    this.onUpdate(event.target.files[0], true);
  }
  /**
    * function that handle on change input element
    *
    * @param event handle change event from input element files parameter
    */
  onUpdateImages(event: any) {
    Array.from(event.target.files).forEach((e) => { this.onUpdate(e, false) });
  }
  /**
    * function for updating product images array and load data to img elements from input field
    *
    * @param file selected files
    * @param cover boolean to select cover image
    */
  onUpdate(file: any, cover: boolean) {
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      alert(this.msg);
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file);
    reader.onload = (_event) => {
      this.msg = "";
      if (cover) {
        this.urls.unshift(reader.result);
      } else {
        this.urls.push(reader.result);
      }
    }
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
    // clear subCategory array
    this.productSubCategories = null;
    console.log(this.productSubCategories)
    // get selected category option when change listener is executed
    const selectedOption = event.target.options[event.target.selectedIndex].text;
    console.log(selectedOption)
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
    * function for feching all product statuses from database.
    *
    * @throws http error 
    */
  getAllProductCodeStatuses() {
    this.productStatusService.getAllStatuses().subscribe({
      next: (collection: ResourceCollection<ProductStatus>) => {
        const productStatuses: Array<ProductStatus> = collection.resources;
        this.productStatuses = productStatuses;
        console.log(productStatuses);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
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
        console.log(productCategories);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  /**
    * function for feching all product sub categories from database.
    *
    * @throws http error 
    */
  getAllSubCategoriesByCategoryName(productCategoryName: string) {
    this.productSubcategoriesService.searchCollection('categoryName/' + productCategoryName).subscribe({
      next: (collection: ResourceCollection<ProductSubCategory>) => {
        const productSubCategories: Array<ProductSubCategory> = collection.resources;
        this.productSubCategories = productSubCategories;
        console.log(productSubCategories);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }

}
