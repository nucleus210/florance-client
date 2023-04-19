import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import ProductSubCategory from "./product-sub-category";
import StorageEntity from "./storage-entity";

@HateoasResource('products-categories')
export default class ProductCategory extends Resource{
    productCategoryId: number;
    productCategoryName: string;
    productCategoryDescription: string;
    productSubCategories?: ProductSubCategory[];
    storage: StorageEntity;
}