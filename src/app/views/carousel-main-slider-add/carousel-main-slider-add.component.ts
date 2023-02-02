import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'carousel-main-slider-add',
  templateUrl: './carousel-main-slider-add.component.html',
  styleUrls: ['./carousel-main-slider-add.component.css']
})
export class CarouselMainSliderAddComponent {
  form: any = {
    productName: null,
    productWeight: null,
    productSize: null,
    unitMeasure: null,
    unitQuantity: null,
    unitSellPrice: null,
    unitOrderPrice: null,
    unitDiscount: null,
    otherProductDetails: null,
    productDescription: null,
  };
  isSignUpFailed: boolean = false;
  errorMessage: string = '';
  public isSuccessful: boolean = false;
  public username: string;
  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();

  }
    /**
    * function for updating product images array and load data to img elements from input field
    * 
    * @param event handle event for input element file parameter
    */
    onSelectFile(event: any) {
      console.log("onUploadImage");
      let fileElementInput = document.getElementById('fileUpload') as HTMLInputElement | null;
      fileElementInput.value = '';
      fileElementInput.files = null;
      console.log(fileElementInput.nodeName)
      fileElementInput.click();
  
    }
      /**
    * function that handle on change input element
    *
    * @param event handle change event from input element file parameter
    */
  onUpdateImageElement(event: any) {
    this.onUpdate(event.target.files[0], true);
  }
    /**
    * function for updating product images array and load data to img elements from input field
    *
    * @param file selected files
    * @param cover boolean to select cover image
    */
    onUpdate(file: any, cover: boolean) {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        alert(this.msg);
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(file);
      reader.onload = (_event) => {
        this.msg = "";
        if (cover) {
          this.urls.unshift(reader.result);
        } else {
          this.urls.push(reader.result);
        }
      }
    }
      /**
    * function for adding new product to database.
    *
    * @param event click event
    * @throws error when required params are not valid or link not found by relation name
    */
  onSliderSubmit() {

  }

}
