import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../error/page-not-found/page-not-found.component';
import { ProductsListComponent } from '../frond-end/views/product-list/products-list.component';
import { CarouselMainSliderAddComponent } from './views/carousel-main-slider-add/carousel-main-slider-add.component';
import { DashboardMainComponent } from './views/dashboard-main/dashboard-main.component';
import { ProductAddComponent } from './views/product-add/product-add.component';
import DashboardComponent from './dashboard.component';
import { ProductsCategoriesComponent } from './views/products-categories/products-add-categories.component';
import { UserAddComponent } from './views/user-add/user-add.component';


const adminRoutes: Routes = [
  {
    path: 'admin', component: DashboardComponent,
    children:
      [
        { path: '', component: DashboardMainComponent },
        { path: 'product-add', component: ProductAddComponent },
        { path: 'product-list', component: ProductsListComponent },
        { path: 'users-add', component: UserAddComponent },
        { path: 'users-add', component: UserAddComponent },
        { path: 'product-category-add', component: ProductsCategoriesComponent  },
        { path: 'carousel-main-slider-add', component: CarouselMainSliderAddComponent  },
        { path: '**', component: PageNotFoundComponent }

      ]
  }];


@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export default class DashboardRoutingModule { }

