import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService, EmbeddedResource } from '@lagoshny/ngx-hateoas-client';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AdminRoutingModule from './admin.routing';

import { RouterModule } from '@angular/router';
import { environment } from '../shared/environments/environment';
import { DataService } from '../services/data.service';
import { HttpInterceptorService } from '../services/http.interceptor.service';
import { CarouselMainSliderAddComponent } from './views/carousel-main-slider-add/carousel-main-slider-add.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProductAddComponent } from './views/product-add/product-add.component';
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
import { UserViewModel } from '../shared/interfaces/user-view-model';
import { BlogPostAddComponent } from './views/blog-post-add/blog-post-add.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LineChartComponent } from './views/monitoring/line-chart/line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import AdminComponent from './admin.component';
import { HttpTraceTableComponent } from './views/monitoring/http-trace-table/http-trace-table.component';
import { HttpResponseCodesCardCountComponent } from './views/monitoring/http-response-codes-card-count/http-response-codes-card-count.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
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
    BlogPostAddComponent,
    LineChartComponent,
    HttpTraceTableComponent,
    HttpResponseCodesCardCountComponent
  
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
    NgSelectModule,
    NgxSpinnerModule,
    NgChartsModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: DataService }],
  bootstrap: [AdminComponent]
})
export default class AdminModule {
  constructor(hateoasConfig: NgxHateoasClientConfigurationService) {
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
