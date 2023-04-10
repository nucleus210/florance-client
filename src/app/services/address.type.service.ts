import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import { environment } from "../shared/environments/environment";
import AddressType from "../shared/interfaces/address-type";

@Injectable({
    providedIn: 'root'
})
export class AddressTypeService extends HateoasResourceOperation<AddressType>{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(AddressType);
    }
    public getAddressTypeById(id: number): Observable<AddressType> {
        return this.resourceHateoasService.getResource(AddressType, id);
    }
    public getAddressTypeBySearchQuery(searchQuery: string): Observable<AddressType> {
        return this.resourceHateoasService.getResource(AddressType, searchQuery);
    }

    public getAllAddressTypes(): Observable<ResourceCollection<AddressType>> {
        return this.resourceHateoasService.getCollection(AddressType);
    }

    public getPagedAddressTypes(): Observable<PagedResourceCollection<AddressType>> {
        return this.resourceHateoasService.getPage(AddressType);
    }

    public searchAddressTypes(searchQuery: string): Observable<ResourceCollection<AddressType>> {
        return this.resourceHateoasService.searchCollection(AddressType, searchQuery);
    }

    public searchPagedAddressTypes(searchQuery: string): Observable<PagedResourceCollection<AddressType>> {
        return this.resourceHateoasService.searchPage(AddressType, searchQuery);
    }
  
}