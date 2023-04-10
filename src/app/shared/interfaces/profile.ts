import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import Address from "./address";
import Storage from "./storage";

@HateoasResource('profiles')
export default class Profile extends Resource{
    profileId: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    jobTitle: string;
    phoneNumber: string;
    profilePhotoUrl: Storage;
    username: string;
    address: Address;
}