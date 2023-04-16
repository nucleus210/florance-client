import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { ToastrService } from "ngx-toastr";
import { AddressTypeService } from "src/app/services/address.type.service";
import { AuthService } from "src/app/services/auth.service";
import { ConfirmationDialogService } from "src/app/services/confirmation.dialog.service";
import { DataService } from "src/app/services/data.service";
import { ProductCategoryService } from "src/app/services/product.category.service";
import { ProductSubCategoryService } from "src/app/services/product.sub.category.service";
import ProductCategory from "src/app/shared/interfaces/product-category";
import ProductSubCategory from "src/app/shared/interfaces/product-sub-category";


@Component({
  selector: 'product-category-add',
  templateUrl: './products-add-categories.component.html',
  styleUrls: ['./products-add-categories.component.css'],
  providers: [ConfirmationDialogService],
})
export class ProductsCategoriesComponent implements OnInit {
  categoryName: string = '';
  categoryDescription: string = '';
  subCategoryName: string = '';
  subCategoryDescription: string = '';

  isChecked: boolean[];

  isCategoryChecked: boolean = false;
  isSubCategoryChecked: boolean = false;

  isSubmitted: boolean = false;
  public isSuccessful: boolean = false;
  public productCategory: ProductCategory = new ProductCategory();
  public productSubCategory: ProductSubCategory | null = null;
  public productCategories: ProductCategory[] | null = null;
  public productSubCategories: ProductSubCategory[] | null = null;

  constructor(private addressTypeService: AddressTypeService,
    private authService: AuthService,
    private productCategoryService: ProductCategoryService,
    private productSubCategoryService: ProductSubCategoryService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private toastr: ToastrService) {
  }


  categoryPayload: any = {
    productCategoryId: null,
    productCategoryName: null,
    productCategoryDescription: null
  };


  subCategoryPayload: any = {
    productSubCategoryId: null,
    productSubCategoryName: null,
    productSubCategoryDescription: null,
    productCategory: null
  };

  ngOnInit(): void {

    this.getAllProductCategories();
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
    this.productSubCategoryService.searchCollection('category-name/' + productCategoryName).subscribe({
      next: (collection: ResourceCollection<ProductSubCategory>) => {
        const productSubCategories: Array<ProductSubCategory> = collection.resources;
        this.productSubCategories = productSubCategories;
        console.log(productSubCategories);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }

  onProductCategorySubmit(f: NgForm) {
    console.log("onProductCategorySubmit: " + f.valid);
    if (f.valid) {
      this.openConfirmationDialogAddNewProductCategory(this.categoryPayload);
    }
  }
  onProductSubCategorySubmit(f: NgForm) {
    console.log("onProductSubCategorySubmit: " + f.valid);
    if (f.valid) {
      this.openConfirmationDialogAddNewProductSubCategory(this.subCategoryPayload);
    }
  }

  openConfirmationDialogAddNewProductCategory(categoryPayload: any) {
    this.confirmationDialogService.confirm('Product category add', 'Do you really want to add product category with name ', categoryPayload.productName, 'ADD')
      .then((confirmed) => {
        console.log('Product confirmed: ', confirmed);
        if (confirmed) {
          this.createProductCategory(categoryPayload);
        }

      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  openConfirmationDialogAddNewProductSubCategory(subCategoryPayload: any) {
    this.confirmationDialogService.confirm('Product sub category add', 'Do you really want to add product sub category with name ', subCategoryPayload.productName, 'ADD')
      .then((confirmed) => {
        console.log('Product confirmed: ', confirmed);
        if (confirmed) {
          this.createProductSubCategory(subCategoryPayload);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  createProductCategory(categoryPayload: any) {
    console.log("Result: " + this.categoryPayload);
    this.productCategoryService
      .createResource({ body: this.categoryPayload })
      .subscribe({
        next: (productResponce: ProductCategory) => {
          this.productCategory = productResponce;
          console.log(productResponce);
          // this.router.navigate(['/admin']);
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }

  createProductSubCategory(subCategoryPayload: any) {
    this.subCategoryPayload.productCategory = this.productCategory;

    this.categoryPayload.productCategoryId = this.productCategory.productCategoryId;
    this.categoryPayload.productCategoryName = this.productCategory.productCategoryName;
    this.categoryPayload.productCategoryDescription = this.productCategory.productCategoryDescription;

    console.log(this.categoryPayload);
    subCategoryPayload.productCategory = this.categoryPayload;
    console.log(this.subCategoryPayload);

    this.productSubCategoryService
      .createResource({ body: subCategoryPayload })
      .subscribe({
        next: (productResponce: ProductSubCategory) => {
          console.log(productResponce);
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }

  onCategorySelected(categoryName: string) {
    console.log("Category selected: " + categoryName);
    this.getAllSubCategoriesByCategoryName(categoryName);
    let productCategory: any = this.productCategories.filter(c => { return c.productCategoryName == categoryName });
    this.productCategory = productCategory;
    this.categoryName = this.productCategory[0].productCategoryName,
    this.categoryDescription = this.productCategory[0].productCategoryDescription

  }

  onSubCategorySelected(subCategoryName: string) {
    console.log("Sub category selected: " + subCategoryName);
    let productSubCategory: any = this.productSubCategories.filter(c => { return c.productSubCategoryName == subCategoryName });
    this.productSubCategory = productSubCategory;
    this.subCategoryName = this.productSubCategory[0].productSubCategoryName,
    this.subCategoryDescription = this.productSubCategory[0].productSubCategoryDescription
  }
}




