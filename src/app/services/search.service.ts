import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import SearchModel from '../shared/interfaces/search-model';


@Injectable({ providedIn: 'root' })
export class SearchService extends HateoasResourceOperation<SearchModel>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(SearchModel);
  }
  public getSearchQueryById(id: number): Observable<SearchModel> {
    return this.resourceHateoasService.getResource(SearchModel, id);
  }
  public getSearchQueryByname(name: string): Observable<SearchModel> {
    return this.resourceHateoasService.getResource(SearchModel, name);
  }

  public getAllSearchQueries(): Observable<ResourceCollection<SearchModel>> {
    return this.resourceHateoasService.getCollection(SearchModel);
  }

  public getPagedSearchQueries(): Observable<PagedResourceCollection<SearchModel>> {
    return this.resourceHateoasService.getPage(SearchModel);
  }

  public searchQuery(searchQuery: string): Observable<SearchModel> {
    return this.resourceHateoasService.searchResource(SearchModel, searchQuery);
  }
  public searchMultipleResources(searchQuery: string): Observable<ResourceCollection<SearchModel>> {
    return this.resourceHateoasService.searchCollection(SearchModel, searchQuery);
  }

  public searchPagedSearchQueries(searchQuery: string): Observable<PagedResourceCollection<SearchModel>> {
    return this.resourceHateoasService.searchPage(SearchModel, searchQuery);
  }
}