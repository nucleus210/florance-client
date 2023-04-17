import { Injectable } from "@angular/core";
import UploadFileModel from "../shared/interfaces/upload-file-model";
import Storage from '../shared/interfaces/storage';
import { Observable, map } from "rxjs";
import { LoginResponse } from "../frond-end/views/auth/login/login-response.payload";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Injectable({
    providedIn: 'root'
  })
export  class FileService {
    public obj: any;

    public storage: Storage | null = null;
    public storages: Storage[] | null = null;
    public uploadFileModel: UploadFileModel;
    constructor(private httpClient: HttpClient) {
    }

    /* function for feching all product sub categories from database.
   *
   * @throws http error 
   */
    async saveStorages(files: any) {
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
    /* function for feching all product sub categories from database.
  *
  * @throws http error 
  */

   async saveStorage(file: any) {
        const form = new FormData();
        form.append("file", file);

        const requestOptions: RequestInit = {
            method: "POST",
            body: form
        };
        
        await fetch(`http://localhost:8080/storages/file`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Upload file result: " + JSON.stringify(result));
                const obj = result;
                let storagesResult = obj["storage"];
                let storageObj = new Storage(storagesResult.resourceId, storagesResult.fileName, storagesResult.fileUrl, storagesResult.size);
                console.log(storageObj);

                return storageObj;

        })
            .catch(error => console.log("Upload file error", JSON.stringify(error)));
            // let storagesResult = this.obj["storage"];
            // let storageObj = new Storage(storagesResult.resourceId, storagesResult.fileName, storagesResult.fileUrl, storagesResult.size);
    }

}







