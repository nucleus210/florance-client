import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMainSliderAddComponent } from './carousel-main-slider-add.component';

describe('CarouselMainSliderAddComponent', () => {
  let component: CarouselMainSliderAddComponent;
  let fixture: ComponentFixture<CarouselMainSliderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselMainSliderAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselMainSliderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
