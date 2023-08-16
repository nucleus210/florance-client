import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxHateoasClientModule, NgxHateoasClientConfigurationService } from '@lagoshny/ngx-hateoas-client';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WebSiteRoutingModule } from './website.routing';
import { WebSiteComponent } from './website.component';
import { RouterModule } from '@angular/router';
import { environment } from '../shared/environments/environment';
import { DataService } from '../services/data.service';
import { HttpInterceptorService } from '../services/http.interceptor.service';
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
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { ProductsListComponent } from './views/product-list/products-list.component';
import { ProductReviewComponent } from './views/product-review/product-review.component';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { BlogPostDetailsComponent } from './views/blog-post-details/blog-post-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaymentSucessComponent } from './views/payment/payment-sucess/payment-sucess.component';
import { PaymentCancelComponent } from './views/payment/payment-cancel/payment-cancel.component';
import { CheckoutComponentComponent } from './views/payment/checkout-component/checkout-component.component';
import { RatingComponent } from "../shared/rating/rating.component";


@NgModule({
    declarations: [
        WebSiteComponent,
        LoginComponent,
        RegisterComponent,
        ProductsListComponent,
        ProductDetailsComponent,
        ProductReviewComponent,
        CardComponent,
        FooterComponent,
        JoinMailingListComponent,
        HomeComponent,
        ContactUsComponent,
        AboutUsComponent,
        CarouselMainSliderComponent,
        BlogPostComponent,
        BlogPostDetailsComponent,
        PaymentSucessComponent,
        PaymentCancelComponent,
        CheckoutComponentComponent,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, { provide: DataService }],
    bootstrap: [WebSiteComponent],
    imports: [
        WebSiteRoutingModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
        NgxHateoasClientModule.forRoot(),
        ToastrModule.forRoot(),
        NgbModule,
        FormsModule,
        BrowserAnimationsModule,
        SecondaryNavbarComponent,
        RouterModule,
        HeaderComponent,
        NgxSpinnerModule,
        NgbRatingModule,
        RatingComponent
    ]
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
