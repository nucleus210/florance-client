import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Address from "./address";
import StorageEntity from "./storage-entity";

@HateoasResource('profiles')
export default class Profile extends Resource{
    profileId: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    jobTitle: string;
    phoneNumber: string;
    profilePhotoUrl: StorageEntity;
    username: string;
    address: Address;
}