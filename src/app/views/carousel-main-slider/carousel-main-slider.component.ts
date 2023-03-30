import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {style, trigger, state} from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'carousel-main-slider',
  templateUrl: './carousel-main-slider.component.html',
  styleUrls: ['./carousel-main-slider.component.css'],
  animations: [trigger('grow', [state('active', style({
     background: 'center center',
     }))])]
})
export class CarouselMainSliderComponent {
	protected isSliderVisible: boolean = false;
	constructor(private router: Router){
  
	  this.router.events.subscribe((event: NavigationStart) => { 
		if(event.url === "/shop"){
		  this.isSliderVisible = true;
		} else {
		  this.isSliderVisible = false;
		}});
	
	}
   
	images = [1, 2, 3, 4, 5, 6, 7].map((n) => `assets/img/products/${n}.jpg`);

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

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
}

