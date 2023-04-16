import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('answers')
export default class Answer extends Resource{
    answerId?: number;
    answer: string;
    username: string;
    questionId: number;
}