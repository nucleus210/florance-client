import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('countries')
export default class Country extends Resource {
    countryCode: string;
    countryName: string;

}