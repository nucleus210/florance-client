import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('storages')
export default class StorageEntity extends Resource {
    resourceId: number;
    fileName: string;
    fileUrl: string;
    size: number;
}
