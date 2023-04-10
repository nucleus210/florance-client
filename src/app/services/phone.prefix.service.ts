import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import { environment } from "../shared/environments/environment";
import PhonePrefix from "../shared/interfaces/phone-prefixes";

@Injectable({
    providedIn: 'root'
})
export class PhonePrefixService extends HateoasResourceOperation<PhonePrefix>{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(PhonePrefix);
    }
    public getPhonePrefixById(id: number): Observable<PhonePrefix> {
        return this.resourceHateoasService.getResource(PhonePrefix, id);
    }
    public getPhonePrefixBySearchQuery(searchQuery: string): Observable<PhonePrefix> {
        return this.resourceHateoasService.getResource(PhonePrefix, searchQuery);
    }

    public getAllPhonePrefixes(): Observable<ResourceCollection<PhonePrefix>> {
        return this.resourceHateoasService.getCollection(PhonePrefix);
    }

    public getPagedPhonePrefixes(): Observable<PagedResourceCollection<PhonePrefix>> {
        return this.resourceHateoasService.getPage(PhonePrefix);
    }

    public searchPhonePrefixes(searchQuery: string): Observable<ResourceCollection<PhonePrefix>> {
        return this.resourceHateoasService.searchCollection(PhonePrefix, searchQuery);
    }

    public searchPagedPhonePrefixes(searchQuery: string): Observable<PagedResourceCollection<PhonePrefix>> {
        return this.resourceHateoasService.searchPage(PhonePrefix, searchQuery);
    }
  
}