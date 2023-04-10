import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Answer from "./answer";
import Like from "./like";


@HateoasResource('questions')
export default class Question extends Resource{
    questionId?: number;
    question: string;
    productId: number;
    likes: Like[];
    answers?: Answer[];
}