import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './views/card/card.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { HomeComponent } from './views/home/home.component';
import { JoinMailingListComponent } from './views/join-mailing-list/join-mailing-list.component';
import { ProductAddComponent } from './views/product-add/product-add.component';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { ProductsListComponent } from './views/product-list/products-list.component';
import { ProductReviewComponent } from './views/product-review/product-review.component';
import { ProgressSpinnerOverviewComponent } from './shared/progress-spinner-overview/progress-spinner-overview.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { MapComponent } from './views/map/map.component';
import { CarouselMainSliderAddComponent } from './views/carousel-main-slider-add/carousel-main-slider-add.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'app-map', component: MapComponent },

 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'card', component: CardComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'product-review/:id', component: ProductReviewComponent },
  { path: 'spinner', component: ProgressSpinnerOverviewComponent },
  { path: 'join-mailing-list', component: JoinMailingListComponent },
  { path: 'carousel-main-slider-add', component: CarouselMainSliderAddComponent },


  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
