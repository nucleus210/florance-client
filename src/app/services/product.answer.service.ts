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
    public getAnswerProjection(id: number): Observable<Answer> {
        return this.resourceHateoasService.getResource(Answer, id);
    }

    public getAnswerProjections(): Observable<ResourceCollection<Answer>> {
        return this.resourceHateoasService.getCollection(Answer);
    }

    public getPagedAnswerProjections(): Observable<PagedResourceCollection<Answer>> {
        return this.resourceHateoasService.getPage(Answer);
    }

    public searchAnswerProjectionByQuestionId(searchQuery: string): Observable<ResourceCollection<Answer>> {
        return this.resourceHateoasService.searchCollection(Answer, searchQuery);
    }

    public searchAnswerProjections(searchQuery: string): Observable<ResourceCollection<Answer>> {
        return this.resourceHateoasService.searchCollection(Answer, searchQuery);
    }

    public searchPagedAnswerProjections(searchQuery: string): Observable<PagedResourceCollection<Answer>> {
        return this.resourceHateoasService.searchPage(Answer, searchQuery);
    }




    public getAnswerById(answerId: NumberFormatStyle): Observable<Answer> {
        return this.http.get<Answer>(`${this.apiServerUrl}/answers/${answerId}`);
    }
    public getAllAnswersByQuestionId(AnswerId: NumberFormatStyle): Observable<Answer[]> {
        return this.http.get<Answer[]>(`${this.apiServerUrl}/answers/Answers/${AnswerId}`);
    }
    public addAnswer(question: Answer): Observable<Answer> {
        return this.http.post<Answer>(`${this.apiServerUrl}/answers`, question);
    }

    public updateAnswer(answerId: NumberFormatStyle, question: Answer): Observable<Answer> {
        return this.http.put<Answer>(`${this.apiServerUrl}/answers/${answerId}`, question);
    }

    public deleteAnswer(answerId: NumberFormatStyle): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/answers/${answerId}`);
    }
}