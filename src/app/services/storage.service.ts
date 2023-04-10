import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import Storage from "../shared/interfaces/storage";
import UploadFileModel from "../shared/interfaces/upload-file-model";

@Injectable({ providedIn: 'root' })
export class StorageService extends HateoasResourceOperation<UploadFileModel>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(UploadFileModel);
  }
  public getIStorageById(id: number): Observable<UploadFileModel> {
    return this.resourceHateoasService.getResource(UploadFileModel, id);
  }

  public getAllIStorages(): Observable<ResourceCollection<UploadFileModel>> {
    return this.resourceHateoasService.getCollection(UploadFileModel);
  }

  public getPagedIStorages(): Observable<PagedResourceCollection<UploadFileModel>> {
    return this.resourceHateoasService.getPage(UploadFileModel);
  }

  public searchIStorage(searchQuery: string): Observable<UploadFileModel> {
    return this.resourceHateoasService.searchResource(UploadFileModel, searchQuery);
  }

  public searchPagedIStorages(searchQuery: string): Observable<PagedResourceCollection<UploadFileModel>> {
    return this.resourceHateoasService.searchPage(UploadFileModel, searchQuery);
  }
}