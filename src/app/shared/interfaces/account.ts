import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";
import User from "./user";
import Storage from "./storage";
import Address from "./address";

@HateoasResource('profiles')
export default class Profile extends Resource {

    profileId: number;
    companyName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    jobTitle: string;
    phoneNumber: string;
    workPhoneNumber: string;
    profilePhotoUrl: Storage;
    user: User;
    address: Address;
    webSite: string;
}
