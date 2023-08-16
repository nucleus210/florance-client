import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Product from "./product";

@HateoasResource('rates')
export default class Rate extends Resource{
    productRateId?: number;
    productRate: number;
    product: Product;
    username: string;
}
