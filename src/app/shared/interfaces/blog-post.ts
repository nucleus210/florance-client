import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import StorageEntity from "./storage-entity";

@HateoasResource('blog-posts')
export default class BlogPost extends Resource{
blogPostId?:number;
title:string;
metaTitle: string;
slug: string;
summary: string;
content: string;
user?: string;
createdAt?: Date;
updatedAt?: Date;
publishedAt?: Date;
storages?: StorageEntity[];
}