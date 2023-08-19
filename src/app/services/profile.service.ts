import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import Profile from '../shared/interfaces/account';

@Injectable({ providedIn: 'root' })
export class ProfileService extends HateoasResourceOperation<Profile>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(Profile);
  }
  public getProfileById(id: number): Observable<Profile> {
    return this.resourceHateoasService.getResource(Profile, id);
  }
  public getProfileByUsername(username: string): Observable<Profile> {
    return this.resourceHateoasService.getResource(Profile, username);
  }

  public getAllProfiles(): Observable<ResourceCollection<Profile>> {
    return this.resourceHateoasService.getCollection(Profile);
  }

  public getPagedProfiles(): Observable<PagedResourceCollection<Profile>> {
    return this.resourceHateoasService.getPage(Profile);
  }

  public searchProfiles(searchQuery: string): Observable<Profile> {
    return this.resourceHateoasService.searchResource(Profile, searchQuery);
  }

  public searchPagedProfiles(searchQuery: string): Observable<PagedResourceCollection<Profile>> {
    return this.resourceHateoasService.searchPage(Profile, searchQuery);
  }
}