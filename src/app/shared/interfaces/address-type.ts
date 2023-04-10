import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('addresses/address-types') // BackEnd API for Addresses resources
export default class AddressType extends Resource {
    addressTypeName: string;
    addressTypeDescription: string;

}