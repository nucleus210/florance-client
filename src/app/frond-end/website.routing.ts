import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebSiteComponent } from './website.component';
import { PageNotFoundComponent } from '../error/page-not-found/page-not-found.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { CardComponent } from './views/card/card.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { HomeComponent } from './views/home/home.component';
import { JoinMailingListComponent } from './views/join-mailing-list/join-mailing-list.component';
import { ProductDetailsComponent } from './views/product-details/product-details.component';
import { ProductsListComponent } from './views/product-list/products-list.component';
import { ProductReviewComponent } from './views/product-review/product-review.component';
import { BlogPostComponent } from './views/blog-post/blog-post.component';
import { BlogPostDetailsComponent } from './views/blog-post-details/blog-post-details.component';

const webRoutes: Routes = [
    {
        path: 'api', component: WebSiteComponent,
        children: [
            { path: '', component: ProductsListComponent },
            { path: 'home', component: HomeComponent },
            { path: 'about-us', component: AboutUsComponent },
            { path: 'blog-post', component: BlogPostComponent },
            { path: 'blog-post-details/:id', component: BlogPostDetailsComponent},
            { path: 'contact-us', component: ContactUsComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'card', component: CardComponent },
            { path: 'product-list', component: ProductsListComponent },
            { path: 'product-list/:category', component: ProductsListComponent },
            { path: 'products/:id', component: ProductDetailsComponent },
            { path: 'product-review/:id', component: ProductReviewComponent },
            { path: 'join-mailing-list', component: JoinMailingListComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    }];
@NgModule({
    imports: [RouterModule.forChild(webRoutes)],
    exports: [RouterModule]
})
export class WebSiteRoutingModule { };