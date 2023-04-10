import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('phone-prefixes')
export default class PhonePrefix extends Resource {
    countryName: string;
    prefix: string;

}