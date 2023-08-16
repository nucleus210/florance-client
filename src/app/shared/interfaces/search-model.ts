import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('search-results')
export default class SearchModel extends Resource {
    searchId?: number;
    name: string;
    alias?: string;
    shortDescription?: string;
    fullDescription?: string;

}