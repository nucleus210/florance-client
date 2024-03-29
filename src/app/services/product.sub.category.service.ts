import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductSubCategory from '../shared/interfaces/product-sub-category';
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class ProductSubCategoryService extends HateoasResourceOperation<ProductSubCategory>{

    constructor(private resourceHateoasService: HateoasResourceService) {
        super(ProductSubCategory);
    }
    public getSubCategoryById(id: number): Observable<ProductSubCategory> {
        return this.resourceHateoasService.getResource(ProductSubCategory, id);
    }

    public getAllSubCategories(): Observable<ResourceCollection<ProductSubCategory>> {
        return this.resourceHateoasService.getCollection(ProductSubCategory);
    }

    public getPagedSubCategories(): Observable<PagedResourceCollection<ProductSubCategory>> {
        return this.resourceHateoasService.getPage(ProductSubCategory);
    }

    public searchSubCategory(searchQuery: string): Observable<ProductSubCategory> {
        return this.resourceHateoasService.searchResource(ProductSubCategory, searchQuery);
    }

    public searchSubCategories(searchQuery: string): Observable<ResourceCollection<ProductSubCategory>> {
        return this.resourceHateoasService.searchCollection(ProductSubCategory, searchQuery);
    }

    public searchPagedSubCategories(searchQuery: string): Observable<PagedResourceCollection<ProductSubCategory>> {
        return this.resourceHateoasService.searchPage(ProductSubCategory, searchQuery);
    }
}