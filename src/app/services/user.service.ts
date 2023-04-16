import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import { UserViewModel } from "../shared/interfaces/user-view-model";

@Injectable({ providedIn: 'root' })
export class UserService extends HateoasResourceOperation<UserViewModel>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(UserViewModel);
  }
  public getUserById(id: number): Observable<UserViewModel> {
    return this.resourceHateoasService.getResource(UserViewModel, id);
  }

  public getUserByName(username: string): Observable<UserViewModel> {
    return this.resourceHateoasService.getResource(UserViewModel, username);
  }


  public getAllUsers(): Observable<ResourceCollection<UserViewModel>> {
    return this.resourceHateoasService.getCollection(UserViewModel);
  }

  public getPagedUsers(): Observable<PagedResourceCollection<UserViewModel>> {
    return this.resourceHateoasService.getPage(UserViewModel);
  }

  public searchUser(searchQuery: string): Observable<UserViewModel> {
        return this.resourceHateoasService.getResource(UserViewModel, searchQuery);
  }
  
  public searchPagedUsers(searchQuery: string): Observable<PagedResourceCollection<UserViewModel>> {
    return this.resourceHateoasService.searchPage(UserViewModel, searchQuery);
  }
}