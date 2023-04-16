import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import ProductCategory from "./product-category";

@HateoasResource('products-sub-categories')
export default class ProductSubCategory extends Resource{
    productSubCategoryId: number;
    productSubCategoryName: string;
    productSubCategoryDescription: string;
    productCategory: ProductCategory;
}