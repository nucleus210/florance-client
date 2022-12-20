import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import IProduct from "./product";

@HateoasResource('rates')
export default class Rate extends Resource{
    productRateId: number;
    productRate: number;
    product: IProduct;
    username: string;
}
