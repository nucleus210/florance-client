import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService } from '@lagoshny/ngx-hateoas-client';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WebSiteRoutingModule } from './website.routing';
import { WebSiteComponent } from './website.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../shared/environments/environment';
import { DataService } from '../services/data.service';
import { HttpInterceptorService } from '../services/http.interceptor.service';
import { ProgressSpinnerOverviewComponent } from '../shared/progress-spinner-overview/progress-spinner-overview.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { CardComponent } from './views/card/card.component';
import { CarouselMainSliderComponent } from './views/carousel-main-slider/carousel-main-slider.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { HomeComponent } from './views/home/home.component';
import { JoinMailingListComponent } from './views/join-mailing-list/join-mailing-list.component';
import { MapComponent } from './views/map/map.component';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { ProductsListComponent } from './views/product-list/products-list.component';
import { ProductReviewComponent } from './views/product-review/product-review.component';



@NgModule({
  declarations: [
    WebSiteComponent,
    LoginComponent,
    RegisterComponent,
    ProductsListComponent,
    MapComponent,
    ProductDetailsComponent,
    ProductReviewComponent,
    CardComponent,
    FooterComponent,
    ProgressSpinnerOverviewComponent,
    JoinMailingListComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    CarouselMainSliderComponent,
  ],
  imports: [
    WebSiteRoutingModule,
    BrowserModule,
    HttpClientModule,

    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgxHateoasClientModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: DataService }],
  bootstrap: [WebSiteComponent]
})
export class WebSiteModule {
  constructor(hateoasConfig: NgxHateoasClientConfigurationService) {
    hateoasConfig.configure({
      http: {
        rootUrl: environment.apiBaseUrl
      }
    });
  }
}
