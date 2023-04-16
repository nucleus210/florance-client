import { EmbeddedResource, HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import ProductSubCategory from "./product-sub-category";

@HateoasResource('products-categories')
export default class ProductCategory extends Resource{
    productCategoryId: number;
    productCategoryName: string;
    productCategoryDescription: string;
    productSubCategories?: ProductSubCategory[];
}