import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Address from "./address";
import StorageEntity from "./storage-entity";

@HateoasResource('suppliers')
export default class Supplier extends Resource {
    supplierId?: number;
    companyName: string;
    contactName: string;
    contactJobTitle: string;
    emailAddress: string;
    companyPhoneNumber: string;
    contactPhoneNumber: string;
    notes: string;
    companyLogo: StorageEntity;
//    private UserServiceModel user;
    address: Address;
    webSite: string;
}
