import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import OrderStatusCode from '../shared/interfaces/order-status-codes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceOperation, HateoasResourceService, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class OrderStatusCodesService extends HateoasResourceOperation<OrderStatusCode>{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(OrderStatusCode);
    }
    public getOrderStatusCodeById(id: number): Observable<OrderStatusCode> {
        return this.resourceHateoasService.getResource(OrderStatusCode, id);
    }
    public getAllOrderStatusCodes(): Observable<ResourceCollection<OrderStatusCode>> {
        return this.resourceHateoasService.getCollection(OrderStatusCode);
    }

    public searchOrderStatusCodes(searchQuery: string): Observable<OrderStatusCode> {
        return this.resourceHateoasService.getResource(OrderStatusCode, searchQuery);
    }

    public getPagedOrderStatusCodes(): Observable<PagedResourceCollection<OrderStatusCode>> {
        return this.resourceHateoasService.getPage(OrderStatusCode);
    }

    public searchPagedOrderStatusCodes(searchQuery: string): Observable<PagedResourceCollection<OrderStatusCode>> {
        return this.resourceHateoasService.searchPage(OrderStatusCode, searchQuery);
    }

}