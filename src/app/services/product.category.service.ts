import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  ProductCategory  from '../shared/interfaces/product-category';
import { HttpClient } from '@angular/common/http';
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService extends HateoasResourceOperation<ProductCategory>{

    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(ProductCategory);
    }
    public getCategoryById(id: number): Observable<ProductCategory> {
        return this.resourceHateoasService.getResource(ProductCategory, id);
    }

    public getAllCategories(): Observable<ResourceCollection<ProductCategory>> {
        return this.resourceHateoasService.getCollection(ProductCategory);
    }

    public getPagedCategories(): Observable<PagedResourceCollection<ProductCategory>> {
        return this.resourceHateoasService.getPage(ProductCategory);
    }

    public searchCategory(searchQuery: string): Observable<ProductCategory> {
        return this.resourceHateoasService.searchResource(ProductCategory, searchQuery);
    }

    public searchCategories(searchQuery: string): Observable<ResourceCollection<ProductCategory>> {
        return this.resourceHateoasService.searchCollection(ProductCategory, searchQuery);
    }

    public searchPagedCategories(searchQuery: string): Observable<PagedResourceCollection<ProductCategory>> {
        return this.resourceHateoasService.searchPage(ProductCategory, searchQuery);
    }
}