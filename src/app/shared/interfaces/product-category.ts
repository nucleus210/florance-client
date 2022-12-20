import { EmbeddedResource, HateoasResource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('productCategory')
export default class IProductCategory extends EmbeddedResource{
    productCategoryId: number;
    productCategoryName: string;
    productCategoryDescription: string;
}