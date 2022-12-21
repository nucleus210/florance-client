import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('order-item-status-codes')
export default class OrderItemStatusCode extends Resource{
    orderItemStatusCodeId: number;
    productStatus: string;
    productStatusDescription: string;
}