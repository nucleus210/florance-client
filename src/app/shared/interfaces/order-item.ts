import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Order from "./order";
import OrderItemStatusCode from "./order-item-status-code";
import Product from "./product";

@HateoasResource('order-items')
export default class OrderItem extends Resource {
    orderItemId: number;
    order: Order;
    product: Product;
    orderItemStatusCode: OrderItemStatusCode;
    orderItemQuantity: number;
    orderItemPrice: number;
    rmaNumber: string;
    rmaIssuedBy: Date;
    rmaIssuedData: Date;
    orderItemDetails: string;
} 