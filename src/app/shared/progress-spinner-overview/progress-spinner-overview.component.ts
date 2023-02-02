import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'progress-spinner-overview',
  templateUrl: './progress-spinner-overview.component.html',
  styleUrls: ['./progress-spinner-overview.component.css']
})
export class ProgressSpinnerOverviewComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  showSpinner: boolean = false;
  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.init();

  }

  init(){
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
      console.log( this.showSpinner = status === 'start')
      this.cdRef.detectChanges();
    });
  }

}
