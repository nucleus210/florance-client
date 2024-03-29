import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { DataService } from 'src/app/services/data.service';
import { SupplierService } from 'src/app/services/supplier.service';
import Supplier from 'src/app/shared/interfaces/supplier';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;

  supplierPayload: any = {
    supplierId: null,
    companyName: null,
    contactName: null,
    contactJobTitle: null,
    emailAddress: null,
    companyPhoneNumber: null,
    contactPhoneNumber: null,
    notes: null,
    companyLogo: null,
    address: null,
    webSite: null
  };

  public isSuccessful: boolean = false;
  public suppliers: Supplier[] | null = null;

  constructor(
    private supplierService: SupplierService,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  /**
    * function for feching all suppliers from database.
    *
    * @throws http error 
    */
  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe({
      next: (collection: ResourceCollection<Supplier>) => {
        const suppliers: Array<Supplier> = collection.resources;
        this.suppliers = suppliers;
        console.log(suppliers);
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }
  /**
    * user intent to provide selected supplier payload for 
    * See {@link ProductAddComponent} component
    *
    * @throws http error 
    */
  selectSupplier(event: any, supplier: any) {
    console.log('SupplierListComponent:');
    console.log(supplier);
    this.dataService.selectSupplierFromListHandler(supplier, supplier);
  }
  /**
    * user intent for loading 
    * See {@link SupplierAddComponent} and fill form data for new supplier.
    * @throws http error 
    */
  addNewSupplier() {
    console.log("add new supplier");
    this.dataService.booleanNewSupplierHandler(false, this.supplierPayload);
  }
  backBtn() {
    console.log("Back to product add form");
    this.dataService.backBtnEmiter(true, true);
  }
}