import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('users')
export class UserViewModel extends Resource {
    userId: number;
    username: string;
    email: string;
   
}
