import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../error/page-not-found/page-not-found.component';
import { ProductsListComponent } from '../frond-end/views/product-list/products-list.component';
import { CarouselMainSliderAddComponent } from './views/carousel-main-slider-add/carousel-main-slider-add.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProductAddComponent } from './views/product-add/product-add.component';
import AdminModule from './admin.component';
import { ProductsCategoriesComponent } from './views/products-categories/products-add-categories.component';
import { UserAddComponent } from './views/user-add/user-add.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { BlogPostAddComponent } from './views/blog-post-add/blog-post-add.component';


const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminModule,
    children:
      [
        { path: '', component: DashboardComponent },
        { path: 'blog-post-add', component: BlogPostAddComponent},
        { path: 'product-add', component: ProductAddComponent },
        { path: 'product-list', component: ProductsListComponent },
        { path: 'users-add', component: UserAddComponent },
        { path: 'user-edit', component: UserEditComponent },
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

