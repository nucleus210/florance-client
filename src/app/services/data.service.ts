import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DataService {


  private nameSource = new BehaviorSubject<string>('');
  private numberSource = new BehaviorSubject<number>(0);
  private bool = new BehaviorSubject<boolean>(false);

  private isSubmited = new BehaviorSubject<boolean>(false);

  private selectedSupplierEmitter = new BehaviorSubject<any>('');

  // private addressPayload = new BehaviorSubject<any>('');
  // newAddress = this.addressPayload.asObservable();
  // private addressProvider = new BehaviorSubject<any>('');

  private providerTraceRequest = new BehaviorSubject<any>('');
  httpRequestTracesPayload = this.providerTraceRequest.asObservable();

  private providerTraceResponse = new BehaviorSubject<any>('');
  httpResponseTracesPayload = this.providerTraceResponse.asObservable();

  private isAddressSubmited = new BehaviorSubject<boolean>(false);
  addressSubmitBool = this.isAddressSubmited.asObservable();

  private addressProvider = new BehaviorSubject<any>('');
  addressPayload = this.addressProvider.asObservable();

  private isNewSupplier = new BehaviorSubject<boolean>(true);
  newSupplier = this.isNewSupplier.asObservable();

  // Supplier submited boolean
  private isSupplierSubmited = new BehaviorSubject<boolean>(false);
  supplierSubmited = this.isSupplierSubmited.asObservable();

  private supplierProvider = new BehaviorSubject<any>('');
  supplierPayLoad = this.supplierProvider.asObservable();

  private isProfileSubmited = new BehaviorSubject<boolean>(false);
  profileSubmited = this.isProfileSubmited.asObservable();

  private profileProvider = new BehaviorSubject<any>('');
  profilePayLoad = this.profileProvider.asObservable();

  supplierPayload = this.selectedSupplierEmitter.asObservable();

  private payload = new BehaviorSubject<any>('');
  options = this.payload.asObservable();

  option = this.nameSource.asObservable();
  isMainSliderActive = this.bool.asObservable();
  productCategory = this.nameSource.asObservable();
  productSubCategory = this.nameSource.asObservable();
  productPrice = this.numberSource.asObservable();


  private provider = new BehaviorSubject<any>('');
  providerPayload = this.provider.asObservable();

  constructor() { }

  genericProviderHandler(options: any, provider: any) {
    this.payload.next(options);
    this.provider.next(provider);
  }
  isSliderActivationHandler(isMainSliderActive: any, provider: any) {
    this.bool.next(isMainSliderActive);
    this.provider.next(provider);
  }
  backBtnEmiter(option: any, provider: any) {
    this.payload.next(option);
    this.provider.next(provider);
  }

  addressModelSubmitionHandler(addressSubmitBool: any, addressPayload: any) {
    this.isAddressSubmited.next(addressSubmitBool);
    this.addressProvider.next(addressPayload);
  }
  profileSubmitHandler(submit: any, provider: any) {
    this.isProfileSubmited.next(submit);
    this.profileProvider.next(provider);
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
  emitHttpTracesToTableComponent(traceRequestPayload: any, providerTraceResponse: any) {
    this.providerTraceRequest.next(traceRequestPayload);
    this.providerTraceResponse.next(providerTraceResponse);
  }
}


