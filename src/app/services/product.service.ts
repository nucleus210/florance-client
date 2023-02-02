import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../shared/interfaces/product';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';


@Injectable({ providedIn: 'root' })
export class ProductService extends HateoasResourceOperation<Product>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(Product);
  }
  public getProductById(id: number): Observable<Product> {
    return this.resourceHateoasService.getResource(Product, id);
  }

  public getAllProducts(): Observable<ResourceCollection<Product>> {
    return this.resourceHateoasService.getCollection(Product);
  }

  public getPagedProducts(): Observable<PagedResourceCollection<Product>> {
    return this.resourceHateoasService.getPage(Product);
  }

  public searchProducts(searchQuery: string): Observable<Product> {
    return this.resourceHateoasService.searchResource(Product, searchQuery);
  }

  public searchPagedProducts(searchQuery: string): Observable<PagedResourceCollection<Product>> {
    return this.resourceHateoasService.searchPage(Product, searchQuery);
  }
}