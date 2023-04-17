import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation.dialog.service';
import UploadFileModel from 'src/app/shared/interfaces/upload-file-model';
import Storage from '../../../shared/interfaces/storage';
import BlogPost from 'src/app/shared/interfaces/blog-post';
import { BlogPostService } from 'src/app/services/blog.post.service';
import StorageEntity from 'src/app/shared/interfaces/storage-entity';

@Component({
  selector: 'blog-post-add',
  templateUrl: './blog-post-add.component.html',
  styleUrls: ['./blog-post-add.component.css'],
  providers: [ConfirmationDialogService]
})
export class BlogPostAddComponent {


  blogPostPayload: any = {
    blogPostId: null,
    title: null,
    metaTitle: null,
    slug: null,
    summary: null,
    content: null,
    user: null,
    createdAt: null,
    updatedAt: null,
    publishedAt: null,
    storages: null
  };

  errorMessage: string = '';
  public isSuccessful: boolean = false;
  public username: string;
  public storages: Storage[] | null = null;
  public uploadFileModel: UploadFileModel;
  public blogPost: BlogPost | null = null;

  url: any = "../../assets/img/products/product_tmp_img.jpg";
  urls: any[] = [];
  msg: string;
  carouselItemView: any[] = [];
  @ViewChild("nav") // Get a reference to the ngbNav
  nav;
  active = 1;

  constructor(
    private authService: AuthService,
    private blogPostService: BlogPostService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService) { }


  ngOnInit(): void {

    this.uploadFileModel = new UploadFileModel();
    this.username = this.authService.getUserName();
  }

  /**
    * function for updating blogpost images array and load data to img elements from input field
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
    * function for updating blogpost images array and load data to img elements from input field
    *
    * @param event handle event from input element files parameter
    */
  onSelectFiles(event: any) {
    let filesElement = document.getElementById('files-upload') as HTMLInputElement | null;
    filesElement.value = '';
    filesElement.files = null;
    filesElement.click();
  }
  /**
    * function that handle on change input element
    *
    * @param event handle change event from input element file parameter
    */
  async onUpdateImageElement(event: any) {
    this.onUpdate(event.target.files[0], true);
    const storage = await saveStorage(event.target.files[0]);
    this.storages = [];
    this.storages.push(storage);
    console.log(this.storages);
  }

  /**
    * function that handle on change input element
    *
    * @param event handle change event from input element files parameter
  */
  async onUpdateImages(event: any) {
    Array.from(event.target.files).forEach((e) => {
      this.onUpdate(e, false);
    });
    this.storages = await saveStorages(event.target.files);
    console.log(this.storages);
  }

  /**
    * function for updating blogpost images array and load data to img elements from input field
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
    * function for adding new blogpost to database.
    *
    * @param event click event
    * @throws error when required params are not valid or link not found by relation name
    */
  async onBlogPostSubmit(f: NgForm) {
    console.log("BlogPost form validation: " + f.valid);
    if (f.valid) {
      if(this.storages !== null) {
        this.blogPostPayload.storages = this.storages;
      this.openConfirmationDialogAddNewBlogPost(this.blogPostPayload);
      }
    }
  }

  openConfirmationDialogAddNewBlogPost(blogPostPayload: any) {
    this.confirmationDialogService.confirm('Blogpost add', 'Do you really want to add blogpost with name ', this.blogPostPayload.title, 'ADD')
      .then((confirmed) => {
        console.log('Blogpost: ', confirmed);
        if (confirmed) {
          this.createBlogPost(blogPostPayload);
        }

      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  createBlogPost(blogPostPayload: any) {
    if (this.storages != null) {
      this.blogPostPayload.storages = this.storages;
    }
   
    console.log("Result: " + this.blogPostPayload);
    this.blogPostService
      .createResource({ body: this.blogPostPayload })
      .subscribe({
        next: (blogPostResponce: BlogPost) => {
          console.log(blogPostResponce);
          this.router.navigate(['/admin/dashboard']);

        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
    // this.router.navigate();
  }
}
/**
  * function for feching all blogpost sub categories from database.
  *
  * @throws http error 
  */
async function saveStorage(file: any) {
  const form = new FormData();
  form.append("file", file);

  const requestOptions: RequestInit = {
    method: "POST",
    body: form
  };
  let obj: any;
  await fetch(`http://localhost:8080/storages/file`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log("Upload file result: " + JSON.stringify(result));
      obj = result;
    })
    .catch(error => console.log("Upload file error", JSON.stringify(error)));
  var storageResult = obj["storage"];
  return storageResult;
}


async function saveStorages(files: any) {
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    console.log("File to upload" + files[i]);
    formData.append("files", files[i]);
  }
  const requestOptions: RequestInit = {
    method: "POST",
    body: formData
  };
  let obj: any;
  await fetch(`http://localhost:8080/storages/files`, requestOptions)
    .then(response => response.json())
    .then(result =>
      obj = result
    )
    .catch(error => console.log("Upload files error", JSON.stringify(error)));
  var storagesResult = obj["storages"];
  console.log(obj["storages"]);
  let storageList: Array<Storage> = [];
  for (let i = 0; i < storagesResult.length; i++) {
    let storageObj = new Storage(storagesResult[i].resourceId, storagesResult[i].fileName, storagesResult[i].fileUrl, storagesResult[i].size);
    storageList.push(storageObj);
    console.log(storageObj);
  }
  console.log(storageList);
  return storageList;

}
