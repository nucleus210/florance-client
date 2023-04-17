import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import OrderStatusCode from '../shared/interfaces/order-status-codes';
import { HateoasResourceOperation, HateoasResourceService, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class OrderStatusCodesService extends HateoasResourceOperation<OrderStatusCode>{

    constructor(private resourceHateoasService: HateoasResourceService) {
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