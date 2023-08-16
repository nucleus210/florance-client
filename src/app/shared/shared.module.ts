import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent } from './ngx-spinner/ngx-spinner.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    NgxSpinnerComponent,
  ],
  imports: [
    CommonModule,
    RatingComponent

  ]
})
export class SharedModule { }
