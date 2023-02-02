import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Question from "./question";

@HateoasResource('answers')
export default class Answer extends Resource{
    answerId?: number;
    answer: string;
    username: string;
    questionId: number;
}