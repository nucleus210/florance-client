import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-generic-dialog',
  templateUrl: './confirmation-generic-dialog.component.html',
  styleUrls: ['./confirmation-generic-dialog.component.css']
})
export class ConfirmationGenericDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() payload: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  constructor(private activeModal: NgbActiveModal) { }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
