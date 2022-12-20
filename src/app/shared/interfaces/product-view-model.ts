import { HateoasProjection, Resource } from "@lagoshny/ngx-hateoas-client";
import IProduct from "./product";
import IProductCategory from "./product-category";
import IProductStatus from "./product-status";
import IProductSubCategory from "./product-sub-category";
import IStorage from "./storage";

@HateoasProjection(IProduct, 'productViewModel')
export default class ProductViewModel extends Resource{
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


