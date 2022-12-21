import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Product from "./product";
import Rate from "./product-rate";

@HateoasResource('reviews')
export default class Review extends Resource {
    productReviewId: string;
    product: Product;
    username: string;
    rate: Rate;
    title: string;
    content: string;
    createdAt: Date;
    publishedAt: Date;
}
