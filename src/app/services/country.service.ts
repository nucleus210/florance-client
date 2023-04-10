import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import { environment } from "../shared/environments/environment";
import Country from "../shared/interfaces/country";

@Injectable({
    providedIn: 'root'
})
export class CountryService extends HateoasResourceOperation<Country>{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(Country);
    }
    public getCountryById(id: number): Observable<Country> {
        return this.resourceHateoasService.getResource(Country, id);
    }
    public getCountryBySearchQuery(searchQuery: string): Observable<Country> {
        return this.resourceHateoasService.getResource(Country, searchQuery);
    }

    public getAllCountries(): Observable<ResourceCollection<Country>> {
        return this.resourceHateoasService.getCollection(Country);
    }

    public getPagedCountries(): Observable<PagedResourceCollection<Country>> {
        return this.resourceHateoasService.getPage(Country);
    }

    public searchCountries(searchQuery: string): Observable<ResourceCollection<Country>> {
        return this.resourceHateoasService.searchCollection(Country, searchQuery);
    }

    public searchPagedCountries(searchQuery: string): Observable<PagedResourceCollection<Country>> {
        return this.resourceHateoasService.searchPage(Country, searchQuery);
    }
  
}