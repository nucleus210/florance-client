import IProductCategory from "./product-category";
import IProductStatus from "./product-status";
import IProductSubCategory from "./product-sub-category";
import IStorage from "./storage"
import { Resource, HateoasResource, HateoasResourceService } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('products')
export default class IProduct extends Resource{
    productId: number;
    productName: string;
    unitMeasure: string;
    unitQuantity: number;
    unitSellPrice: number;
    unitOrderPrice: number;
    unitDiscount: number;
    productColor: string;
    productSize: string;
    productWeight: number;
    productDescription: string;
    otherProductDetails: string;
    productStatus: IProductStatus;
    productCategory: IProductCategory;
    productSubCategory: IProductSubCategory;
    supplier: {};
    storages: IStorage[];
}