import { Component } from '@angular/core';

@Component({
  selector: 'supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent {

public isSuccessful:boolean = false;

  onSupplierSubmit(event:any){}
  openLogoFile(event:any) {}
}
