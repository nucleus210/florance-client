import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import OrderStatusCodes from "./order-status-codes";

@HateoasResource('orders')
export default class Order extends Resource {
    orderId: number;
    username: string;
    orderStatusCode?: OrderStatusCodes;
    dateOrderPlaced: Date;
    orderDetails?: string;
    canDelete: boolean;
}



