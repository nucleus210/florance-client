import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('contacts')
export default class Contact extends Resource{
    contactId?: number;
    fistName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    createdDate?: Date;

}