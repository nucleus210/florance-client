import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import Supplier from "../shared/interfaces/supplier";

@Injectable({ providedIn: 'root' })
export class SupplierService extends HateoasResourceOperation<Supplier>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(Supplier);
  }
  public getSupplierById(id: number): Observable<Supplier> {
    return this.resourceHateoasService.getResource(Supplier, id);
  }

  public getAllSuppliers(): Observable<ResourceCollection<Supplier>> {
    return this.resourceHateoasService.getCollection(Supplier);
  }

  public getPagedSuppliers(): Observable<PagedResourceCollection<Supplier>> {
    return this.resourceHateoasService.getPage(Supplier);
  }

  public searchSupplier(searchQuery: string): Observable<Supplier> {
    return this.resourceHateoasService.searchResource(Supplier, searchQuery);
  }

  public searchPagedSuppliers(searchQuery: string): Observable<PagedResourceCollection<Supplier>> {
    return this.resourceHateoasService.searchPage(Supplier, searchQuery);
  }
}