import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Question from "./question";

@HateoasResource('likes')
export default class Like extends Resource{
    likeId: number;
    question: Question;
}