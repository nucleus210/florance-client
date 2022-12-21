import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('order-status-codes')
export default class OrderStatusCodes extends Resource {
    orderStatusCodeId: number;
    statusCode: string;
    statusDescription: string;
}