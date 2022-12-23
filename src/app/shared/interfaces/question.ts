import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Answer from "./answer";
import Like from "./like";
import Product from "./product";
import IUser from "./user";

@HateoasResource('questions')
export default class Question extends Resource{
    questionId?: number;
    question: string;
    product: Product;
    likes: Like[];
    answers?: Answer[];
}