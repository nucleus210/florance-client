import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../shared/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getHttpTraces(): Observable<any> {
        return this.http.get(`${this.apiServerUrl}/actuator/httpexchanges`);
    }

  
}