import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Answer from '../shared/interfaces/answer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceOperation, HateoasResourceService, PagedResourceCollection, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class ProductAnswerService extends HateoasResourceOperation<Answer>{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(Answer);
    }
    public getAnswerById(id: number): Observable<Answer> {
        return this.resourceHateoasService.getResource(Answer, id);
    }

    public getAllAnswer(): Observable<ResourceCollection<Answer>> {
        return this.resourceHateoasService.getCollection(Answer);
    }

    public getPagedAnswer(): Observable<PagedResourceCollection<Answer>> {
        return this.resourceHateoasService.getPage(Answer);
    }
    public searchAnswer(searchQuery: string): Observable<Answer> {
        return this.resourceHateoasService.searchResource(Answer, searchQuery);
    }

    public searchAnswers(searchQuery: string): Observable<ResourceCollection<Answer>> {
        return this.resourceHateoasService.searchCollection(Answer, searchQuery);
    }

    public searchPagedAnswer(searchQuery: string): Observable<PagedResourceCollection<Answer>> {
        return this.resourceHateoasService.searchPage(Answer, searchQuery);
    }
}