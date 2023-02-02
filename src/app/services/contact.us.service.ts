import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import Contact from "../shared/interfaces/contact";

@Injectable({
    providedIn: 'root'
})
export class ContactService extends HateoasResourceOperation<Contact>{

    constructor(private resourceHateoasService: HateoasResourceService) {
        super(Contact);
    }
    public getContactById(id: number): Observable<Contact> {
        return this.resourceHateoasService.getResource(Contact, id);
    }
    public getContactBySearchQuery(searchQuery: string): Observable<Contact> {
        return this.resourceHateoasService.getResource(Contact, searchQuery);
    }
    public getContactProjections(): Observable<ResourceCollection<Contact>> {
        return this.resourceHateoasService.getCollection(Contact);
    }

    public getPagedContacts(): Observable<PagedResourceCollection<Contact>> {
        return this.resourceHateoasService.getPage(Contact);
    }

    public searchContacts(searchQuery: string): Observable<ResourceCollection<Contact>> {
        return this.resourceHateoasService.searchCollection(Contact, searchQuery);
    }

    public searchPagedContacts(searchQuery: string): Observable<PagedResourceCollection<Contact>> {
        return this.resourceHateoasService.searchPage(Contact, searchQuery);
    }

}