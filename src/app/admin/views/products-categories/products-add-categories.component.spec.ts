import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCategoriesComponent } from './products-add-categories.component';

describe('ProductsCategoriesComponent', () => {
  let component: ProductsCategoriesComponent;
  let fixture: ComponentFixture<ProductsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});