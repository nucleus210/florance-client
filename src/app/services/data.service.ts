import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DataService {
  private nameSource = new BehaviorSubject<string>('');

  private isSubmited = new BehaviorSubject<boolean>(false);
  private isNewSupplier = new BehaviorSubject<boolean>(true);

  private selectedSupplierEmitter = new BehaviorSubject<any>('');

  // private addressPayload = new BehaviorSubject<any>('');
  // newAddress = this.addressPayload.asObservable();
  
  private provider = new BehaviorSubject<any>('');
  providerPayload = this.provider.asObservable();

  // private addressProvider = new BehaviorSubject<any>('');



  private isAddressSubmited = new BehaviorSubject<boolean>(false);
  addressSubmitBool = this.isAddressSubmited.asObservable();
  private addressProvider = new BehaviorSubject<any>('');
  addressPayload = this.addressProvider.asObservable();


  // Supplier submited
  private isSupplierSubmited = new BehaviorSubject<boolean>(false);
  supplierSubmited = this.isSupplierSubmited.asObservable();
  private supplierProvider = new BehaviorSubject<any>('');
  supplierPayLoad = this.supplierProvider.asObservable();




  newSupplier = this.isNewSupplier.asObservable();
  option = this.nameSource.asObservable();
  submit = this.isSubmited.asObservable();
  supplierPayload = this.selectedSupplierEmitter.asObservable();
  
  private payload = new BehaviorSubject<any>('');;
  options = this.payload.asObservable();


  constructor() { }

 genericProviderHandler(option: any, provider: any) {
    this.payload.next(option);
    this.provider.next(provider);

  }

  backBtnEmiter(option: any, provider: any) {
    this.payload.next(option);
    this.provider.next(provider);
  }


  productColorOptionClickHandler(option: string, provider: string) {
    this.nameSource.next(option);
    this.provider.next(provider);

  }

  addressModelSubmitionHandler(addressSubmitBool: any, addressPayload: any) {
    this.isAddressSubmited.next(addressSubmitBool);
    this.addressProvider.next(addressPayload);

  }


  booleanSubmitionHandler(submit: any, provider: any) {
    this.isSubmited.next(submit);
    this.provider.next(provider);

  }

  
  supplierSubmitHandler(submit: any, provider: any) {
    this.isSupplierSubmited.next(submit);
    this.supplierProvider.next(provider);

  }
  selectSupplierFromListHandler(supplierPayload: any, providerPayload: any) {
    this.selectedSupplierEmitter.next(supplierPayload);
    this.provider.next(providerPayload);
  }
  addNewSupplierHandler(supplierPayload: any, providerPayload: any) {
    this.selectedSupplierEmitter.next(supplierPayload);
    this.provider.next(providerPayload);
  }

  booleanNewSupplierHandler(newSupplier: any, provider: any) {
    this.isNewSupplier.next(newSupplier);
    this.provider.next(provider);
  }
}


