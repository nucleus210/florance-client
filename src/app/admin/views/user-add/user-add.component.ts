import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { ToastrService } from 'ngx-toastr';
import { AddressTypeService } from 'src/app/services/address.type.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation.dialog.service';
import { CountryService } from 'src/app/services/country.service';
import { PhonePrefixService } from 'src/app/services/phone.prefix.service';
import AddressType from 'src/app/shared/interfaces/address-type';
import Country from 'src/app/shared/interfaces/country';
import PhonePrefix from 'src/app/shared/interfaces/phone-prefixes';
import PhonePrefixes from 'src/app/shared/interfaces/phone-prefixes';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  active = 1;
  isActive = true;

  public countries: Country[] | null = null;
  public addressTypes: AddressType[] | null = null;
  public phonePrefixes: PhonePrefixes[] | null = null;

  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  addressForm: any = {
    addressId: null,
    streetAddress: null,
    streetAddressSec: null,
    city: null,
    stateProvinceRegion: null,
    zipPostCode: null,
    country: null,
    otherAddressDetails: null,
    addressType: null
  }


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerRequestPayload: { username: any; email: any; password: any; confirmPassword: any; };
  
  constructor(private addressTypeService: AddressTypeService,
    private authService: AuthService,
    private countryService: CountryService,
    private phonePrefixService: PhonePrefixService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) {

  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllAddressTypes();
    this.getAllPhonePrefixes();

  }


  @ViewChild("nav") // Get a reference to the ngbNav
  nav;

  selectTab() {
    // Programatically select the second tab
    this.nav.select(2);
  }
  onRegister(): void {
    const { username, email, password, confirmPassword } = this.form;
    this.registerRequestPayload = { username, email, password, confirmPassword };


    if (password !== confirmPassword) {
      this.isSignUpFailed = true;
      this.errorMessage = 'Passwords do not match'
    } else {
      this.authService.register(this.registerRequestPayload).subscribe({
        next: data => {
          console.log('Data: ' + data);
          console.log('Registered new user ' + username);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/product-list']);
        },
        error: err => {
          // handle error from server
          console.log(err);
          this.errorMessage = err.error.errorMessage;
          this.isSignUpFailed = true;
        }
      });
    }
    this.nav.select(2);
    this.isActive = true;
  };


  /**
    * function for feching all countries from database.
    *
    * @throws http error 
    */
  getAllAddressTypes() {
    this.addressTypeService.getAllAddressTypes().subscribe({
      next: (collection: ResourceCollection<AddressType>) => {
        const addressTypes: Array<AddressType> = collection.resources;
        this.addressTypes = addressTypes;
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }

  /**
    * function for feching all address types from database.
    *
    * @throws http error 
    */
  getAllCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (collection: ResourceCollection<Country>) => {
        const countries: Array<Country> = collection.resources;
        this.countries = countries;
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
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
