import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationGenericDialogComponent } from './confirmation-generic-dialog.component';

describe('ConfirmationGenericDialogComponent', () => {
  let component: ConfirmationGenericDialogComponent;
  let fixture: ComponentFixture<ConfirmationGenericDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationGenericDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationGenericDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
