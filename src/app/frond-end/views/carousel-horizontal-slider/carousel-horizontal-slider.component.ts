import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import Product from 'src/app/shared/interfaces/product';

@Component({
  selector: 'carousel-horizontal-slider',
  templateUrl: './carousel-horizontal-slider.component.html',
  styleUrls: ['./carousel-horizontal-slider.component.css']
})
export class CarouselHorizontalSliderComponent implements OnInit {
  @Input() sliderProducts: Product[];


  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  public slideItem: any[] = [];
  public sliderItems: any[] = [];
  changeLog: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.sliderProducts) {
      this.createSlides(this.sliderProducts);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.sliderProducts = changes.sliderProducts.currentValue;
    this.createSlides(this.sliderProducts);
  }
  /**
    * function for carousel slider events.
    *
    * @param slideEvent control event
    */
  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  showNowBtn(event: any) {
    console.log(event.target.name);
  }

  shopBtn(event: any) {
    console.log(event.target.name);
    this.router.navigateByUrl('/api/products/' + event.target.name);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  createSlides(event: any) {
    if(event){
      for (let i = 0; i < event.length; i++) {
        this.slideItem.push(event[i]);
        if (i % 3 == 0) {
          this.sliderItems.push(this.slideItem);
          this.slideItem = [];
        }
      }
    }
  }
}
