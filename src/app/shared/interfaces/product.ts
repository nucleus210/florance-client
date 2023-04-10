import ProductCategory from "./product-category";
import ProductStatus from "./product-status";
import ProductSubCategory from "./product-sub-category";
import Storage from "./storage"
import { Resource, HateoasResource, HateoasResourceService } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('products')
export default class Product extends Resource{
    productId: number;
    productName: string;
    unitMeasure: string;
    unitQuantity: number;
    unitSellPrice: number;
    unitOrderPrice: number;
    unitDiscount: number;
    productColor?: string;
    productSize: string;
    productWeight: number;
    productDescription: string;
    otherProductDetails: string;
    productStatus: ProductStatus;
    productCategory: ProductCategory;
    productSubCategory: ProductSubCategory;
    supplier?: {};
    storages?: Storage[];
}