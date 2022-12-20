import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceService, HateoasResourceOperation, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import Review from '../shared/interfaces/review';


@Injectable({ providedIn: 'root' })
export class ProductReviewService extends HateoasResourceOperation<Review>{
  private apiServerUrl = environment.apiBaseUrl;


  constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
    super(Review);
  }
  public getReviewProjection(id: number): Observable<Review> {
    return this.resourceHateoasService.getResource(Review, id);
  }

  public getReviewProjections(): Observable<ResourceCollection<Review>> {
    return this.resourceHateoasService.getCollection(Review);
  }

  public getPagedReviewProjections(): Observable<PagedResourceCollection<Review>> {
    return this.resourceHateoasService.getPage(Review);
  }

  public searchReviewProjection(searchQuery: string): Observable<Review> {
    return this.resourceHateoasService.searchResource(Review, searchQuery);
  }
  public searchReviewProjectionsByProductId(searchQuery: string): Observable<ResourceCollection<Review>> {
    return this.resourceHateoasService.searchCollection(Review, searchQuery);
  }

  public searchReviewProjections(searchQuery: string): Observable<ResourceCollection<Review>> {
    return this.resourceHateoasService.searchCollection(Review, searchQuery);
  }

  public searchPagedReviewProjections(searchQuery: string): Observable<PagedResourceCollection<Review>> {
    return this.resourceHateoasService.searchPage(Review, searchQuery);
  }




  public getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiServerUrl}/Reviews/all`);
  }
  public getReview(ReviewId: NumberFormatStyle): Observable<Review> {
    return this.http.get<Review>(`${this.apiServerUrl}/Review/${ReviewId}`);
  }
  public addReview(Review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiServerUrl}/Reviews`, Review);
  }

  public updateReview(Review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiServerUrl}/Reviews`, Review);
  }

  public deleteReview(ReviewId: NumberFormatStyle): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Reviews/${ReviewId}`);
  }
}