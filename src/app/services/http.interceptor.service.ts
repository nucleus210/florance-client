import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    // inject authetification service
    constructor(private authenticationService: AuthService) { }

    // intercept all outgoing requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isLoggedIn() && req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.authenticationService.getJwtToken()
                })
            });
             return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}