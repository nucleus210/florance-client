import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import IProduct from "./product";
import Rate from "./product-rate";

@HateoasResource('reviews/products')

export default class Review extends Resource {
    productReviewId: string;
    product: IProduct;
    username: string;
    rate: Rate;
    title: string;
    content: string;
    createdAt: Date;
    publishedAt: Date;
}
