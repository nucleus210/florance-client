import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductsListComponent
  ]
})
export class ProductModule { }
