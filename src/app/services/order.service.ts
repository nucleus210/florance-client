import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Order from '../shared/interfaces/order';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceOperation, HateoasResourceService, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends HateoasResourceOperation<Order>{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(Order);
    }
    public getOrdeById(id: number): Observable<Order> {
        return this.resourceHateoasService.getResource(Order, id);
    }
    public getOrderBySearchQuery(searchQuery: string): Observable<Order> {
        return this.resourceHateoasService.getResource(Order, searchQuery);
    }
    public getOrderProjections(): Observable<ResourceCollection<Order>> {
        return this.resourceHateoasService.getCollection(Order);
    }

    public getPagedOrders(): Observable<PagedResourceCollection<Order>> {
        return this.resourceHateoasService.getPage(Order);
    }

    public searchOrders(searchQuery: string): Observable<ResourceCollection<Order>> {
        return this.resourceHateoasService.searchCollection(Order, searchQuery);
    }

    public searchPagedOrders(searchQuery: string): Observable<PagedResourceCollection<Order>> {
        return this.resourceHateoasService.searchPage(Order, searchQuery);
    }

}