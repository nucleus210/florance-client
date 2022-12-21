import { EmbeddedResource, HateoasResource } from "@lagoshny/ngx-hateoas-client";
import IProductCategory from "./product-category";

@HateoasResource('productSubCategory')
export default class ProductSubCategory extends EmbeddedResource{
    productSubCategoryId: number;
    productSubCategoryName: string;
    productSubCategoryDescription: string;
    productCategory: IProductCategory;
}