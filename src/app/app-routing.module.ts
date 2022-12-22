import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './product-list/products-list.component';
import { ProductReviewComponent } from './product-review/product-review.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'card', component: CardComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'product-review/:id', component: ProductReviewComponent },


  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
