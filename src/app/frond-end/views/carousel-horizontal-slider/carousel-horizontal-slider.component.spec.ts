import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHorizontalSliderComponent } from './carousel-horizontal-slider.component';

describe('CarouselHorizontalSliderComponent', () => {
  let component: CarouselHorizontalSliderComponent;
  let fixture: ComponentFixture<CarouselHorizontalSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselHorizontalSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselHorizontalSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
