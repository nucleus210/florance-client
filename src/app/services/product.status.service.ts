import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  ProductStatus  from '../shared/interfaces/product-status';
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class ProductStatusService extends HateoasResourceOperation<ProductStatus>{

    constructor(private resourceHateoasService: HateoasResourceService) {
        super(ProductStatus);
    }
    public getStatusById(id: number): Observable<ProductStatus> {
        return this.resourceHateoasService.getResource(ProductStatus, id);
    }

    public getAllStatuses(): Observable<ResourceCollection<ProductStatus>> {
        return this.resourceHateoasService.getCollection(ProductStatus);
    }

    public getPagedStatuses(): Observable<PagedResourceCollection<ProductStatus>> {
        return this.resourceHateoasService.getPage(ProductStatus);
    }

    public searchStatus(searchQuery: string): Observable<ProductStatus> {
        return this.resourceHateoasService.searchResource(ProductStatus, searchQuery);
    }

    public searchStatuses(searchQuery: string): Observable<ResourceCollection<ProductStatus>> {
        return this.resourceHateoasService.searchCollection(ProductStatus, searchQuery);
    }

    public searchPagedStatuses(searchQuery: string): Observable<PagedResourceCollection<ProductStatus>> {
        return this.resourceHateoasService.searchPage(ProductStatus, searchQuery);
    }
}