import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpResponseCodesCardCountComponent } from './http-response-codes-card-count.component';

describe('HttpResponseCodesCardCountComponent', () => {
  let component: HttpResponseCodesCardCountComponent;
  let fixture: ComponentFixture<HttpResponseCodesCardCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpResponseCodesCardCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpResponseCodesCardCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
