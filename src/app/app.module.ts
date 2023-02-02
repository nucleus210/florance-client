import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductModule } from './views/product-list/products-list.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService } from '@lagoshny/ngx-hateoas-client';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ProductReviewComponent } from './views/product-review/product-review.component';
import { CardComponent } from './views/card/card.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { ProductAddComponent } from './views/product-add/product-add.component';
import { FooterComponent } from './footer/footer.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerOverviewComponent } from './shared/progress-spinner-overview/progress-spinner-overview.component';
import { JoinMailingListComponent } from './views/join-mailing-list/join-mailing-list.component';
import { HomeComponent } from './views/home/home.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';

import { MapComponent } from './views/map/map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import{MatDividerModule} from '@angular/material/divider';
import { environment } from './environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { ProductsCategoriesComponent } from './views/products-categories/products-categories.component';
import { CarouselMainSliderComponent } from './views/carousel-main-slider/carousel-main-slider.component';
import { CarouselMainSliderAddComponent } from './views/carousel-main-slider-add/carousel-main-slider-add.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    ProductReviewComponent,
    CardComponent,
    ProductAddComponent,
    FooterComponent,
    ProgressSpinnerOverviewComponent,
    JoinMailingListComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    MapComponent,
    ProductsCategoriesComponent,
    CarouselMainSliderComponent,
    CarouselMainSliderAddComponent,
    DashboardComponent,

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
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule ,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    GoogleMapsModule,
    SecondaryNavbarComponent,
    RouterModule,
    HeaderComponent,



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
