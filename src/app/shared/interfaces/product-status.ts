import { EmbeddedResource, HateoasEmbeddedResource } from "@lagoshny/ngx-hateoas-client";

@HateoasEmbeddedResource(['productStatus'])
export default class ProductStatus extends EmbeddedResource{ 
    productStatusId: number;
    productStatusName: string;
    productStatusDescription: string;
}