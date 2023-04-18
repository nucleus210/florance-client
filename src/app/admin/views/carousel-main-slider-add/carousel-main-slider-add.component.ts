import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { SliderItemsService } from 'src/app/services/slider.items.service';
import SliderItem from 'src/app/shared/interfaces/slider-item';

@Component({
  selector: 'carousel-main-slider-add',
  templateUrl: './carousel-main-slider-add.component.html',
  styleUrls: ['./carousel-main-slider-add.component.css']
})
export class CarouselMainSliderAddComponent {

  form: any = {
    storage: null,
    sliderItemTitle: null,
    sliderItemContent: null,
  };

  msg: string;
  urls: any[] = [];
  url: any = "../../assets/img/products/product_tmp_img.jpg";

  errorMessage: string = '';
  public username: string;
  public isSuccessful: boolean = false;
  private storage: Storage = null;

  constructor(private authService: AuthService,
    private router: Router,
    private fileService: FileService,
    private sliderItemsService: SliderItemsService) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();

  }
  /**
  * function for updating slideritem image and load data to img element from input field
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
  async onUpdateImageElement(event: any) {
    this.urls = this.fileService.onUpdate(event.target.files[0], true, this.urls);
    this.storage = await this.fileService.saveStorage(event.target.files[0]);
    console.log(this.storage);
  }

  /**
  * function for adding new slide to database.
  *
  * @param event click event
  * @throws error when required params are not valid or link not found by relation name
  */
  onSliderSubmit() {
    if (this.urls.length === 0) {
      this.errorMessage = 'Please upload new slide image first';
      return;
    }
    this.form.storage = this.storage;
    console.log(this.storage);
    this.sliderItemsService
      .createResource({ body: this.form })
      .subscribe({
        next: (sliderItem: SliderItem) => {
          console.log(sliderItem);
          this.router.navigate(['/admin']);

        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
  }
}
