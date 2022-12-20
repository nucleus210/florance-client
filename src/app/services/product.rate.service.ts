import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import Rate from '../shared/interfaces/product-rate';


@Injectable({ providedIn: 'root' })
export class ProductRateService extends HateoasResourceOperation<Rate>{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
    super(Rate);
  }

  public getRateProjection(id: number): Observable<Rate> {
    return this.resourceHateoasService.getResource(Rate, id);
  }

  public getRateProjections(): Observable<ResourceCollection<Rate>> {
    return this.resourceHateoasService.getCollection(Rate);
  }

  public getPagedRateProjections(): Observable<PagedResourceCollection<Rate>> {
    return this.resourceHateoasService.getPage(Rate);
  }

  public searchRateProjection(searchQuery: string): Observable<Rate> {
    return this.resourceHateoasService.searchResource(Rate, searchQuery);
  }
  public searchRateProjectionsByProductId(searchQuery: string): Observable<ResourceCollection<Rate>> {
    return this.resourceHateoasService.searchCollection(Rate, searchQuery);
  }

  public searchRateProjections(searchQuery: string): Observable<ResourceCollection<Rate>> {
    return this.resourceHateoasService.searchCollection(Rate, searchQuery);
  }

  public searchPagedRateProjections(searchQuery: string): Observable<PagedResourceCollection<Rate>> {
    return this.resourceHateoasService.searchPage(Rate, searchQuery);
  }




  public getRates(): Observable<Rate[]> {
    return this.http.get<Rate[]>(`${this.apiServerUrl}/rate`);
  }
  public getRate(RateId: NumberFormatStyle): Observable<Rate> {
    return this.http.get<Rate>(`${this.apiServerUrl}/rates/${RateId}`);
  }
  public addRate(Rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(`${this.apiServerUrl}/rates`, Rate);
  }

  public updateRate(Rate: Rate): Observable<Rate> {
    return this.http.put<Rate>(`${this.apiServerUrl}/rates`, Rate);
  }

  public deleteRate(RateId: NumberFormatStyle): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/rates/${RateId}`);
  }
}