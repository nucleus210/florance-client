import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('addresses')
export default class Address extends Resource{
    addressId: number;
    streetAddress: string;
    streetAddressSec: string;
    city: string;
    stateProvinceRegion: string;
    zipPostCode: string;
    country: string[];
    otherAddressDetails: string;
    addressType: string[];
}