import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import Rate from '../shared/interfaces/product-rate';


@Injectable({ providedIn: 'root' })
export class ProductRateService extends HateoasResourceOperation<Rate>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(Rate);
  }

  public getRateById(id: number): Observable<Rate> {
    return this.resourceHateoasService.getResource(Rate, id);
  }

  public getAllRates(): Observable<ResourceCollection<Rate>> {
    return this.resourceHateoasService.getCollection(Rate);
  }

  public getPagedRates(): Observable<PagedResourceCollection<Rate>> {
    return this.resourceHateoasService.getPage(Rate);
  }

  public searchRate(searchQuery: string): Observable<Rate> {
    return this.resourceHateoasService.searchResource(Rate, searchQuery);
  }
  public searchRates(searchQuery: string): Observable<ResourceCollection<Rate>> {
    return this.resourceHateoasService.searchCollection(Rate, searchQuery);
  }

  public searchPagedRates(searchQuery: string): Observable<PagedResourceCollection<Rate>> {
    return this.resourceHateoasService.searchPage(Rate, searchQuery);
  }
}