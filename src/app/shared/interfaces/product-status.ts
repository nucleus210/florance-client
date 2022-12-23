import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('products-statuses')
export default class ProductStatus extends Resource{ 
    productStatusId: number;
    productStatusName: string;
    productStatusDescription: string;
}