import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  Question  from '../shared/interfaces/question';
import { HttpClient } from '@angular/common/http';
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class ProductQuestionService extends HateoasResourceOperation<Question>{

    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(Question);
    }
    public getQuestionById(id: number): Observable<Question> {
        return this.resourceHateoasService.getResource(Question, id);
    }

    public getAllQuestions(): Observable<ResourceCollection<Question>> {
        return this.resourceHateoasService.getCollection(Question);
    }

    public getPagedQuestions(): Observable<PagedResourceCollection<Question>> {
        return this.resourceHateoasService.getPage(Question);
    }

    public searchQuestion(searchQuery: string): Observable<Question> {
        return this.resourceHateoasService.searchResource(Question, searchQuery);
    }

    public searchQuestions(searchQuery: string): Observable<ResourceCollection<Question>> {
        return this.resourceHateoasService.searchCollection(Question, searchQuery);
    }

    public searchPagedQuestions(searchQuery: string): Observable<PagedResourceCollection<Question>> {
        return this.resourceHateoasService.searchPage(Question, searchQuery);
    }
}