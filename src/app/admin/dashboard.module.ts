import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService } from '@lagoshny/ngx-hateoas-client';
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

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMainComponent,
    ProductAddComponent,
    CarouselMainSliderAddComponent,
    UserAddComponent,
    UserEditComponent,
    SupplierAddComponent,
    ],
  imports: [
    AdminRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgxHateoasClientModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
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
      }
    });
  }
}
