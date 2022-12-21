import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Answer from "./answer";
import Product from "./product";
import IUser from "./user";

@HateoasResource('questions')
export default class Question extends Resource{
    questionId: number;
    question: string;
    user: IUser;
    product: Product;
    answers: Answer[];
}