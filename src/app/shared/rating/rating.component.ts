import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { async } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductRateService } from 'src/app/services/product.rate.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  selected = 0;
  @Input() 
  readonly: boolean = true;
  @Input() 
  currentRate: any;
  @Output()
  outputData = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    // // Add param observer to route
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.id = +params.get('id');
    //   console.log(this.id)
    // });
  }
 async onRateChange(event: any) {
    // timeout to wait for rating component to be hidden
    setTimeout(()=>{
      this.selected = event.target.id;
      // console.log(this.id);
      console.log(this.selected);
        this.emitData(this.selected)}, 10);
  }
  emitData(selected: number) {
    this.outputData.emit(selected);
  }
}
