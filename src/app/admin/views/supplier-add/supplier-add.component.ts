import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PhonePrefixService } from 'src/app/services/phone.prefix.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { FileService } from 'src/app/services/file.service';
import Address from 'src/app/shared/interfaces/address';
import AddressType from 'src/app/shared/interfaces/address-type';
import Country from 'src/app/shared/interfaces/country';
import PhonePrefix from 'src/app/shared/interfaces/phone-prefixes';
import Storage from 'src/app/shared/interfaces/storage';
import Supplier from 'src/app/shared/interfaces/supplier';

@Component({
  selector: 'supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {
  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;
  @ViewChild('f') supplierForm: NgForm;

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
    storage: null,
    webSite: null
  };
  public isAddressSubmited: boolean = false;
  public isSupplierSubmited: boolean = false;
  public isSuccessful: boolean = false;
  public supplier: Supplier = null;
  public address: Address = null;
  public countries: Country[] | null = null;
  public addressTypes: AddressType[] | null = null;
  public phonePrefixes: PhonePrefix[] | null = null;
  public storage: Storage | null = null;
  constructor(
    private authService: AuthService,
    private phonePrefixService: PhonePrefixService,
    private supplierService: SupplierService,
    private router: Router,
    private fileService: FileService,
    private toastr: ToastrService,
    private dataService: DataService) {

  }

  ngOnInit(): void {

    this.getAllPhonePrefixes();

    this.dataService.addressSubmitBool.subscribe(data => {
      console.log('Address is submited: ' + data);
      if (data) {
        this.isAddressSubmited = data;
      }
    });

    this.dataService.addressPayload.subscribe(data => {
      console.log('Address payload: ' + JSON.stringify(data));
      if (this.isAddressSubmited) {
        this.address = data;
        console.log(this.address);
        this.isAddressSubmited = data
      }
    });
  }

  onSupplierSubmit(f: NgForm) {
    console.log("onSupplierSubmit: " + f.valid);
    this.isSupplierSubmited = f.valid;
    if(this.isSupplierSubmited && this.isAddressSubmited) {
      this.supplierPayload.address = this.address;
      console.log("Successfully submitted supplier and address: " + JSON.stringify(this.supplierPayload));
      this.supplierService.createResource({ body: this.supplierPayload })
      .subscribe({
        next: (supplierResponse: Supplier) => {
          this.supplier = supplierResponse;
          console.log(this.supplier);
          console.log(supplierResponse);
          this.dataService.booleanNewSupplierHandler(true, this.supplierPayload);
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
    } else {
      this.dataService.supplierSubmitHandler(true, true);
    }
  }


  intendSupplierSubmit(f: NgForm) {
    console.log("SuppAddresslier intent: " + f.valid);
    console.log(" intent: " + this.isAddressSubmited);

    console.log("Supplier obj:: " + JSON.stringify(f.value));
    if (f.valid && this.isAddressSubmited) {
      this.supplierPayload = f.value;
      console.log(this.supplierPayload)
      this.supplierPayload.address == this.address;
      this.supplierPayload.storage == this.storage;
      console.log(this.supplierPayload)
    }
  }

  /**
    * function for updating product images array and load data to img elements from input field
    *
    * @param event handle event from input element files parameter
    */
  onSelectFile(event: any) {
    let filesElement = document.getElementById('file-upload') as HTMLInputElement | null;
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
    this.fileService.onUpdate(event.target.files[0], true, this.urls);
    var test = this.fileService.saveStorage(event.target.files[0]);
    console.log(test);
  }

    /**
  * function for feching all phone prefixes from database.
  *
  * @throws http error 
  */
    getAllPhonePrefixes() {
      this.phonePrefixService.getAllPhonePrefixes().subscribe({
        next: (collection: ResourceCollection<PhonePrefix>) => {
          const phonePrefixes: Array<PhonePrefix> = collection.resources;
          this.phonePrefixes = phonePrefixes;
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
    }

  
}
