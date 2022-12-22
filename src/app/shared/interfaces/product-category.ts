import { EmbeddedResource, HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('products-categories')
export default class ProductCategory extends Resource{
    productCategoryId: number;
    productCategoryName: string;
    productCategoryDescription: string;
}