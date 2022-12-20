import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  Question  from '../shared/interfaces/question';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
    providedIn: 'root'
})
export class ProductQuestionService extends HateoasResourceOperation<Question>{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private resourceHateoasService: HateoasResourceService, private http: HttpClient) {
        super(Question);
    }
    public getQuestionProjection(id: number): Observable<Question> {
        return this.resourceHateoasService.getResource(Question, id);
    }

    public getQuestionProjections(): Observable<ResourceCollection<Question>> {
        return this.resourceHateoasService.getCollection(Question);
    }

    public getPagedQuestionProjections(): Observable<PagedResourceCollection<Question>> {
        return this.resourceHateoasService.getPage(Question);
    }

    public searchQuestionProjection(searchQuery: string): Observable<Question> {
        return this.resourceHateoasService.searchResource(Question, searchQuery);
    }

    public searchQuestionProjections(searchQuery: string): Observable<ResourceCollection<Question>> {
        return this.resourceHateoasService.searchCollection(Question, searchQuery);
    }

    public searchPagedQuestionProjections(searchQuery: string): Observable<PagedResourceCollection<Question>> {
        return this.resourceHateoasService.searchPage(Question, searchQuery);
    }


    
    public getQuestionById(questionId: NumberFormatStyle): Observable<Question> {
        return this.http.get<Question>(`${this.apiServerUrl}/question/${questionId}`);
    }
    public getAllQuestionsByProductId (productId: NumberFormatStyle): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.apiServerUrl}/questions/products/${productId}`);
    }
    public addQuestion(question: Question, productId: NumberFormatStyle): Observable<Question> {
        return this.http.post<Question>(`${this.apiServerUrl}/questions/products/${productId}`, question);
    }

    public updateQuestion(questionId: NumberFormatStyle, question: Question): Observable<Question> {
        return this.http.put<Question>(`${this.apiServerUrl}/questions/${questionId}` , question);
    }

    public deleteQuestion(questionId: NumberFormatStyle): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/questions/${questionId}`);
    }
}