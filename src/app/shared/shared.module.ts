import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent } from './ngx-spinner/ngx-spinner.component';
import { RatingComponent } from './rating/rating.component';
import { ProductsHelper } from './helper/products-helper';
import { AppComponent } from '../app.component';



@NgModule({
  declarations: [
    NgxSpinnerComponent,
    ProductsHelper,
  ],
  imports: [
    CommonModule,
    RatingComponent

  ],
  providers: [

  { provide: ProductsHelper }],
  bootstrap: [AppComponent]
})

export class SharedModule { }
