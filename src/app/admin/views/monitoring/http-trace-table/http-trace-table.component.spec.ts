import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTraceTableComponent } from './http-trace-table.component';

describe('HttpTraceTableComponent', () => {
  let component: HttpTraceTableComponent;
  let fixture: ComponentFixture<HttpTraceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpTraceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpTraceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
