import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductsListComponent } from './product-list/products-list.component';
import { ProductModule } from './product-list/products-list.module';
import { ProductService } from './services/product.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService } from '@lagoshny/ngx-hateoas-client';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { CardComponent } from './card/card.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { ProductAddComponent } from './product-add/product-add.component';
import { FooterComponent } from './footer/footer.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    ProductReviewComponent,
    CardComponent,
    DashboardComponent,
    ProductAddComponent,
    FooterComponent,
    SecondaryNavbarComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgxHateoasClientModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: DataService}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(hateoasConfig: NgxHateoasClientConfigurationService){
    hateoasConfig.configure({
      http: {
        rootUrl: environment.apiBaseUrl
      }
    });
  }
}
