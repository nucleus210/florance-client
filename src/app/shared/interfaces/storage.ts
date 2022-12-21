import { EmbeddedResource, HateoasEmbeddedResource } from "@lagoshny/ngx-hateoas-client";

@HateoasEmbeddedResource(['storages'])
export default class Storage extends EmbeddedResource{
    resourceId: number;
    fileName: string;
    fileUrl: string;
    size: number;
}
