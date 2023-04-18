import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Resource, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AuthService } from '../../../services/auth.service';
import { ProductCategoryService } from '../../../services/product.category.service';
import { ProductService } from '../../../services/product.service';
import { ProductStatusService } from '../../../services/product.status.service';
import { ProductSubCategoryService } from '../../../services/product.sub.category.service';
import Storage from '../../../shared/interfaces/storage';
import Supplier from 'src/app/shared/interfaces/supplier';
import Product from '../../../shared/interfaces/product';
import ProductCategory from '../../../shared/interfaces/product-category';
import ProductStatus from '../../../shared/interfaces/product-status';
import ProductSubCategory from '../../../shared/interfaces/product-sub-category';
import { StorageService } from 'src/app/services/storage.service';
import UploadFileModel from 'src/app/shared/interfaces/upload-file-model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/services/confirmation.dialog.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [ConfirmationDialogService]
})
export class ProductAddComponent {
  productPayload: any = {
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
    productStatus: null,
    productCategory: null,
    productSubCategory: null,
    supplier: null,
    storages: null
  };

  isSupplier: boolean = false;
  isSupplierList: boolean = true;
  errorMessage: string = '';
  public isSuccessful: boolean = false;
  public username: string;
  public productStatuses: ProductStatus[] | null = null;
  public productCategories: ProductCategory[] | null = null;
  public productSubCategories: ProductSubCategory[] | null = null;
  public storages: Storage[] | null = null;
  public supplier: Supplier | null = null;
  public uploadFileModel: UploadFileModel;
  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;
  carouselItemView: any[] = [];
  @ViewChild("nav") // Get a reference to the ngbNav
  nav;
  active = 1;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productSubcategoriesService: ProductSubCategoryService,
    private productStatusService: ProductStatusService,
    private fileService: FileService,
    private router: Router,
    private storageService: StorageService,
    private dataService: DataService,
    private confirmationDialogService: ConfirmationDialogService) { }


  ngOnInit(): void {

    this.uploadFileModel = new UploadFileModel();
    this.username = this.authService.getUserName();
    this.getAllProductCodeStatuses();
    this.getAllProductCategories();

    // Observer for selected supplier from SupplierListComponent 
    this.dataService.supplierPayload.subscribe(data => {
      console.log("Observe: add supplier supplier list component: ");
      console.log(data);
      // check if data is valid
      if(data instanceof Resource ) {
        // open confirmation dialog box to confirm selected supplier
        this.openConfirmationDialogSelectSupplierFromList(data);
      }
    });

    // Observer for event from supplierAddBtn from SupplierListComponent 
    this.dataService.newSupplier.subscribe(data => {
      this.isSupplierList = data;
      console.log("Observe: add new supplier form: " + this.isSupplierList);
    });

    
  /**
    * Back button click observer. Emmiter {@link SupplierListComponent}
    * 
    * @param data handle boolean value if true back button was clicked from supplier list component
    */
    // 
    this.dataService.options.subscribe(data => {
      if(data) {
        this.active = 1;
        console.log(this.active);
        console.log("Change active navTab after pressed backBtn: " + data);
      } 
    });
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
  async onUpdateImageElement(event: any) {
    this.fileService.onUpdate(event.target.files[0], false, this.urls);
    const storage = await this.fileService.saveStorage(event.target.files[0]);
    this.storages = [];
    this.storages.push(storage);
    console.log(this.storages);
  }

  /**
    * function that handle on change input element
    *
    * @param event handle change event from input element files parameter
  */
  async onUpdateImages(event: any) {
    Array.from(event.target.files).forEach((e) => {
      this.fileService.onUpdate(e, false, this.urls);
    });
    this.storages = await this.fileService.saveStorages(event.target.files);
    console.log(this.storages);

    console.log(event.target.files);
  }

  /**
    * function for adding new product to database.
    *
    * @param event click event
    * @throws error when required params are not valid or link not found by relation name
    */
  async onProductSubmit(f: NgForm) {
    console.log("test: " + f.valid);
    if (f.valid) {
      this.openConfirmationDialogAddNewProduct(this.productPayload);
    }
  }

  nextBtnAddSupplier() {
    this.active = 2;
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
    } else {
      // else empty subcategories array
      this.productSubCategories = [];
    }
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
    this.productSubcategoriesService.searchCollection('category-name/' + productCategoryName).subscribe({
      next: (collection: ResourceCollection<ProductSubCategory>) => {
        const productSubCategories: Array<ProductSubCategory> = collection.resources;
        this.productSubCategories = productSubCategories;
        console.log(productSubCategories);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }


  openConfirmationDialogAddNewProduct(productPayload: any) {
    this.confirmationDialogService.confirm('Product add', 'Do you really want to add product with name ', productPayload.productName, 'ADD')
    .then((confirmed) => {
      console.log('Product confirmed: ', confirmed);
      if (confirmed) { 
      this.createProduct(productPayload);
      }
  
  })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


 openConfirmationDialogSelectSupplierFromList(supplierPayload: any) {
    this.confirmationDialogService.confirm('Product supplier add', 'Do you really want to add selected supplier  ', supplierPayload.companyName, 'ADD')
    .then((confirmed) => {
      console.log('Supplier confirmed: ', confirmed);
      if (confirmed) { 
        this.supplier = supplierPayload;
        console.log(this.supplier);
        this.active = 1;
      }
  
  })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  createProduct(productPayload: any) {
      if(this.storages != null) {
        this.productPayload.storages = this.storages;
      }
      if(this.supplier != null) {
        this.productPayload.supplier = this.supplier;
      }
      console.log("Result: " + this.productPayload);
      this.productService
        .createResource({ body: this.productPayload })
        .subscribe({
          next: (productResponce: Product) => {
            console.log(productResponce);
            this.router.navigate(['/admin']);

          },
          error: (error: HttpErrorResponse) => { console.log(error.message); }
        });
      // this.router.navigate();
    }
}




