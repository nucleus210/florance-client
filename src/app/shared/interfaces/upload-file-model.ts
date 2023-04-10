import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('storages/uploads')
export default class UploadFileModel extends Resource {
    name: string;
    files: any;
    
}