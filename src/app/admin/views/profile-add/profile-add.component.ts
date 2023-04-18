import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Address } from 'cluster';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/services/confirmation.dialog.service';
import { DataService } from 'src/app/services/data.service';
import { PhonePrefixService } from 'src/app/services/phone.prefix.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/file.service';
import Profile from 'src/app/shared/interfaces/account';
import AddressType from 'src/app/shared/interfaces/address-type';
import Country from 'src/app/shared/interfaces/country';
import PhonePrefix from 'src/app/shared/interfaces/phone-prefixes';
import StorageEntity from 'src/app/shared/interfaces/storage-entity';

@Component({
  selector: 'profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css'],
  providers: [ConfirmationDialogService]
})
export class ProfileAddComponent implements OnInit {
  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;
  @ViewChild('f') profileForm: NgForm;

  profilePayload: any = {
    profileId: null,
    companyName: null,
    firstName: null,
    middleName: null,
    lastName: null,
    birthDate: null,
    gender: null,
    jobTitle: null,
    phoneNumber: null,
    workPhoneNumber: null,
    profilePhotoUrl: null,
    user: null,
    address: null,
    webSite: null
  };
  public username: string = null;
  public isAddressSubmited: boolean = false;
  public isSuccessful: boolean = false;
  public address: Address = null;
  public countries: Country[] | null = null;
  public addressTypes: AddressType[] | null = null;
  public phonePrefixes: PhonePrefix[] | null = null;
  public storage: StorageEntity | null = null;
  constructor(
    private phonePrefixService: PhonePrefixService,
    private router: Router,
    private fileService: FileService,
    private toastr: ToastrService,
    private dataService: DataService,
    private profileService: ProfileService, 
    private confirmationDialogService: ConfirmationDialogService) {

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

  onProfileSubmit(f: NgForm): void {
    console.log("Pfofile submit: " + f.valid);
    this.dataService.profileSubmitHandler(true, true);

    if (f.valid && this.isAddressSubmited) {
      this.openConfirmationDialogAddNewProduct(this.profilePayload);
    } else {

    }
  }

  openConfirmationDialogAddNewProduct(productPayload: any) {
    this.confirmationDialogService.confirm('Profile add', 'Do you really want to add profile for user with name:  ', this.username, 'ADD')
    .then((confirmed) => {
      console.log('Profile confirmed: ', confirmed);
      if (confirmed) { 
      this.createProfile(productPayload);
      }
  
  })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  intendProfileSubmit(f: NgForm) {
    console.log("SuppAddresslier intent: " + f.valid);
    console.log(" intent: " + this.isAddressSubmited);

    console.log("Supplier obj:: " + JSON.stringify(f.value));
    if (f.valid && this.isAddressSubmited) {
      this.profilePayload = f.value;
      console.log(this.profilePayload)
      this.profilePayload.address == this.address;
      this.profilePayload.storage == this.storage;
      console.log(this.profilePayload)
      // this.dataService.addNewSupplierHandler(true, this.supplierPayload);

    }
  }
  createProfile(profilePayload: any) {
    if(this.storage != null) {
      this.profilePayload.storages = this.storage;
    }
    if(this.address != null) {
      this.profilePayload.address = this.address;
    }
    console.log("Result: " + this.profilePayload);
    this.profileService
      .createResource({ body: this.profilePayload })
      .subscribe({
        next: (productResponce: Profile) => {
          console.log(productResponce);
          this.router.navigate(['/admin']);
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }

  /**
    * function for updating product images array and load data to img elements from input field
    *
    * @param event handle event from input element files parameter
    */
  onSelectFile(event: any) {
    let filesElement = document.getElementById('fileUpload') as HTMLInputElement | null;
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
   var storage = await this.fileService.saveStorage(event.target.files[0]);

  //  TODO 
  //  this.storage = storage;

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
