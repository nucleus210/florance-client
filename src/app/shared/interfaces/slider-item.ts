import { HateoasResource, Resource } from "@lagoshny/ngx-hateoas-client";

@HateoasResource('slider')
export default class SliderItem extends Resource {
    sliderItemId: number;
    storage: Storage;
    sliderItemTitle: string;
    sliderItemContent: string;
}
