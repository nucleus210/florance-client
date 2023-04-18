import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import SliderItem from "../shared/interfaces/slider-item";

@Injectable({ providedIn: 'root' })
export class SliderItemsService extends HateoasResourceOperation<SliderItem>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(SliderItem);
  }
  public getSliderItemById(id: number): Observable<SliderItem> {
    return this.resourceHateoasService.getResource(SliderItem, id);
  }

  public getAllSliderItems(): Observable<ResourceCollection<SliderItem>> {
    return this.resourceHateoasService.getCollection(SliderItem);
  }

  public getPagedSliderItems(): Observable<PagedResourceCollection<SliderItem>> {
    return this.resourceHateoasService.getPage(SliderItem);
  }

  public searchSliderItem(searchQuery: string): Observable<SliderItem> {
    return this.resourceHateoasService.searchResource(SliderItem, searchQuery);
  }

  public searchPagedSliderItems(searchQuery: string): Observable<PagedResourceCollection<SliderItem>> {
    return this.resourceHateoasService.searchPage(SliderItem, searchQuery);
  }
}