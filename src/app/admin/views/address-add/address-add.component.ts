import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { event } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AddressTypeService } from 'src/app/services/address.type.service';
import { AuthService } from 'src/app/services/auth.service';
import { CountryService } from 'src/app/services/country.service';
import { DataService } from 'src/app/services/data.service';
import { PhonePrefixService } from 'src/app/services/phone.prefix.service';
import AddressType from 'src/app/shared/interfaces/address-type';
import Country from 'src/app/shared/interfaces/country';
import PhonePrefix from 'src/app/shared/interfaces/phone-prefixes';

@Component({
  selector: 'address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {

  @ViewChild('f') addressForm: NgForm;

  public isSuccessful: boolean = false;
  public country: Country | null = null;
  public countries: Country[] | null = null;
  public addressType: AddressType | null = null;
  public addressTypes: AddressType[] | null = null;
  private phonePrefix: PhonePrefix | null = null;
  public phonePrefixes: PhonePrefix[] | null = null;
  isSubmitted: boolean = false;
  ifSubmitted: boolean = false;

  constructor(private addressTypeService: AddressTypeService,
    private authService: AuthService,
    private dataService: DataService,
    private countryService: CountryService,
    private phonePrefixService: PhonePrefixService,
    private router: Router,
    private toastr: ToastrService) {

  }

  addressPayload: any = {
    addressId: null,
    streetAddress: null,
    streetAddressSec: null,
    city: null,
    stateProvinceRegion: null,
    zipPostCode: null,
    country: null,
    otherAddressDetails: null,
    addressType: null
  };
  
  ngOnInit(): void {
    this.getAllCountries();
    this.getAllAddressTypes();
    this.getAllPhonePrefixes();
    this.dataService.supplierPayLoad.subscribe(data => {
      console.log("Supllier submition emiter: " + this.isSubmitted);
      if(data && data !== undefined) {
        this.isSubmitted = data;

      this.intendAddressSubmit(this.addressForm);
      } 
    });
    this.dataService.profilePayLoad.subscribe(data => {
      console.log("Profile submition emiter: " + this.isSubmitted);
      console.log(data);
      if(data && data !== undefined) {
        this.isSubmitted = data;

      this.intendAddressSubmit(this.addressForm);
      } 
    });
  }

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

  
  /**
  * function for submiting address form
  *
  * @throws http error 
  */
  onAddressSubmit(f: NgForm){
    console.log("onAddressSubmit: " + this.addressPayload);
    this.isSubmitted = true;
    // this.formGroup.submitted;
    // console.log(f.value);  // { first: '', last: '' }

  }
 intendAddressSubmit(f: NgForm){
    console.log("Address submit intent: " + this.isSubmitted);
    if (!f.valid && f.valid !== undefined){
      console.log("Address form confirm intent: " + f.valid);

    const submitButton = document.getElementById('addressSubmit');
    submitButton.click();
    } else {
      var countryStr = this.addressPayload.country;
      console.log("Country: " + countryStr);
      this.country = this.countries.filter(c => { return c.countryName === countryStr;})[0];
      this.addressPayload.country = this.country;
      var countryStr = this.addressPayload.addressType;
      var addressTypeStr = this.addressPayload.addressType;
      this.addressType = this.addressTypes.filter(c => { return c.addressTypeName === addressTypeStr})[0];
      this.addressPayload.addressType = this.addressType;
      console.log(this.country)
      console.log(this.addressType)
      console.log("Address form confirm intent: " + f.valid);
      this.dataService.addressModelSubmitionHandler(true, this.addressPayload);
      
    }

    // this.formGroup.submitted;
    console.log(f.value);  // { first: '', last: '' }
    console.log(this.addressPayload);  // { first: '', last: '' }

  }
}


