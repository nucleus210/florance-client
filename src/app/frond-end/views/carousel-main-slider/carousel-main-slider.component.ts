import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {style, trigger, state} from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import SliderItem from 'src/app/shared/interfaces/slider-item';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { SliderItemsService } from 'src/app/services/slider.items.service';

@Component({
  selector: 'carousel-main-slider',
  templateUrl: './carousel-main-slider.component.html',
  styleUrls: ['./carousel-main-slider.component.css'],
  animations: [trigger('grow', [state('active', style({
     background: 'center center',
     }))])]
})
export class CarouselMainSliderComponent implements OnInit {
	protected isSliderVisible: boolean = false;
	protected sliderItems: SliderItem[] = [];


	constructor(private router: Router, private sliderItemsService: SliderItemsService){
	  this.router.events.subscribe((event: NavigationStart) => { 
		if(event.url === "/shop"){
		  this.isSliderVisible = true;
		} else {
		  this.isSliderVisible = false;
		}});
	
	}

	// images = [1, 2, 3, 4, 5, 6, 7].map((n) => `assets/img/products/${n}.jpg`);



	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel: NgbCarousel;

	ngOnInit(): void {
		this.getSliderItems();
	}
   
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
	  /**
 * function for getting ordered items count.
 *
 * @param order user active order object
 * @param entities one or more entities that should be added to the resource collection
 * @throws error when required params are not valid or link not found by relation name
 */
	  getSliderItems() {
		this.sliderItemsService.getCollection().subscribe({
		  next: (collection: ResourceCollection<SliderItem>) => {
			const sliderItems: Array<SliderItem> = collection.resources;
			this.sliderItems = sliderItems;
			console.log(this.sliderItems)
		  },
		  error: (error: HttpErrorResponse) => { console.log(error.message); }
		});
	  }
}

