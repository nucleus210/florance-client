import { EmbeddedResource, HateoasResource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('productCategory')
export default class ProductCategory extends EmbeddedResource{
    productCategoryId: number;
    productCategoryName: string;
    productCategoryDescription: string;
}