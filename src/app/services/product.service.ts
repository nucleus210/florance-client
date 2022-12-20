import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IProduct from '../shared/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import ProductViewModel from '../shared/interfaces/product-view-model';


@Injectable({ providedIn: 'root' })
export class ProductService extends HateoasResourceOperation<IProduct>{
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
    super(IProduct);
  }
  public getProductProjection(id: number): Observable<IProduct> {
    return this.resourceHateoasService.getResource(IProduct, id);
  }

  public getProductProjections(): Observable<ResourceCollection<IProduct>> {
    return this.resourceHateoasService.getCollection(IProduct);
  }

  public getPagedProductProjections(): Observable<PagedResourceCollection<IProduct>> {
    return this.resourceHateoasService.getPage(IProduct);
  }

  public searchProductProjection(searchQuery: string): Observable<IProduct> {
    return this.resourceHateoasService.searchResource(IProduct, searchQuery);
  }

  public searchProductProjections(searchQuery: string): Observable<ResourceCollection<IProduct>> {
    return this.resourceHateoasService.searchCollection(IProduct, searchQuery);
  }

  public searchPagedProductProjections(searchQuery: string): Observable<PagedResourceCollection<IProduct>> {
    return this.resourceHateoasService.searchPage(IProduct, searchQuery);
  }




  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiServerUrl}/products/all`);
  }
  public getProduct(productId: NumberFormatStyle): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiServerUrl}/product/${productId}`);
  }
  public addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiServerUrl}/products`, product);
  }

  public updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiServerUrl}/products`, product);
  }

  public deleteProduct(productId: NumberFormatStyle): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/products/${productId}`);
  }
}