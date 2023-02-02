import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMainSliderComponent } from './carousel-main-slider.component';

describe('CarouselMainSliderComponent', () => {
  let component: CarouselMainSliderComponent;
  let fixture: ComponentFixture<CarouselMainSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselMainSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselMainSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
