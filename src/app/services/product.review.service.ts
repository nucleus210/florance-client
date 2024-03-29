import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import Review from '../shared/interfaces/review';


@Injectable({ providedIn: 'root' })
export class ProductReviewService extends HateoasResourceOperation<Review>{

  constructor(private resourceHateoasService: HateoasResourceService) {
    super(Review);
  }
  public getReviewById(id: number): Observable<Review> {
    return this.resourceHateoasService.getResource(Review, id);
  }

  public getAllReviews(): Observable<ResourceCollection<Review>> {
    return this.resourceHateoasService.getCollection(Review);
  }

  public getPagedReviews(): Observable<PagedResourceCollection<Review>> {
    return this.resourceHateoasService.getPage(Review);
  }

  public searchReview(searchQuery: string): Observable<Review> {
    return this.resourceHateoasService.searchResource(Review, searchQuery);
  }
  public searchReviews(searchQuery: string): Observable<ResourceCollection<Review>> {
    return this.resourceHateoasService.searchCollection(Review, searchQuery);
  }

  public searchPagedReviews(searchQuery: string): Observable<PagedResourceCollection<Review>> {
    return this.resourceHateoasService.searchPage(Review, searchQuery);
  }
}