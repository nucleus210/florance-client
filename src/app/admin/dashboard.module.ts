import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService, EmbeddedResource } from '@lagoshny/ngx-hateoas-client';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AdminRoutingModule from './dashboard.routing';

import { RouterModule } from '@angular/router';
import { environment } from '../shared/environments/environment';
import { DataService } from '../services/data.service';
import { HttpInterceptorService } from '../services/http.interceptor.service';
import { CarouselMainSliderAddComponent } from './views/carousel-main-slider-add/carousel-main-slider-add.component';
import { DashboardMainComponent } from './views/dashboard-main/dashboard-main.component';
import { ProductAddComponent } from './views/product-add/product-add.component';
import DashboardComponent from './dashboard.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { SupplierAddComponent } from './views/supplier-add/supplier-add.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddressAddComponent } from './views/address-add/address-add.component';
import { SupplierListComponent } from './views/supplier-list/supplier-list.component';
import { ConfirmationGenericDialogComponent } from './views/modals/confirmation-generic-dialog/confirmation-generic-dialog.component';
import { ProfileAddComponent } from './views/profile-add/profile-add.component';
import { ProductsCategoriesComponent } from './views/products-categories/products-add-categories.component';
import ProductSubCategory from '../shared/interfaces/product-sub-category';
import { UserViewModel } from '../shared/interfaces/user-view-model';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMainComponent,
    ProductAddComponent,
    CarouselMainSliderAddComponent,
    UserAddComponent,
    UserEditComponent,
    SupplierAddComponent,
    AddressAddComponent,
    SupplierListComponent,
    ConfirmationGenericDialogComponent,
    ProfileAddComponent,
    ProductsCategoriesComponent,
     ],
  imports: [
    AdminRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgxHateoasClientModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule, 
    NgbTooltipModule,
    NgbPopoverModule,
    NgSelectModule

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: DataService}],
  bootstrap: [DashboardComponent]
})
export default class DashboardModule { 
  constructor(hateoasConfig: NgxHateoasClientConfigurationService){
    hateoasConfig.configure({
      http: {
        rootUrl: environment.apiBaseUrl
      },
      useTypes: {
        resources: [UserViewModel]
        
    }
    });
  }
}
