import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import OrderItem from '../shared/interfaces/order-item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceOperation, HateoasResourceService, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class OrderItemService extends HateoasResourceOperation<OrderItem>{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(OrderItem);
    }
    public getOrderItemById(id: number): Observable<OrderItem> {
        return this.resourceHateoasService.getResource(OrderItem, id);
    }
    public getOrderItemBySearchQuery(searchQuery: string): Observable<OrderItem> {
        return this.resourceHateoasService.getResource(OrderItem, searchQuery);
    }

    public getAllOrderItems(): Observable<ResourceCollection<OrderItem>> {
        return this.resourceHateoasService.getCollection(OrderItem);
    }

    public getPagedOrderItems(): Observable<PagedResourceCollection<OrderItem>> {
        return this.resourceHateoasService.getPage(OrderItem);
    }

    public searchOrderItems(searchQuery: string): Observable<ResourceCollection<OrderItem>> {
        return this.resourceHateoasService.searchCollection(OrderItem, searchQuery);
    }

    public searchPagedOrderItem(searchQuery: string): Observable<PagedResourceCollection<OrderItem>> {
        return this.resourceHateoasService.searchPage(OrderItem, searchQuery);
    }
}