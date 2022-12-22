import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import IProductCategory from "./product-category";

@HateoasResource('products-sub-categories')
export default class ProductSubCategory extends Resource{
    productSubCategoryId: number;
    productSubCategoryName: string;
    productSubCategoryDescription: string;
    productCategory: IProductCategory;
}