import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    // inject authetification service
    constructor(private authenticationService: AuthService, private spinner: NgxSpinnerService) { }

    // intercept all outgoing requests
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();

        if (this.authenticationService.isLoggedIn() && request.url.indexOf('basicauth') === -1) {
            const authRequest = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.authenticationService.getJwtToken()
                })
            });
            // console.log(authRequest);


            return this.handler(next, authRequest);
        } else {
            console.log(request);

            return this.handler(next, request);
        }
    }

    handler(next: any, request: HttpRequest<any>) {
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                this.spinner.hide();
            }
        },
            (error: HttpErrorResponse) => {
                this.spinner.hide();
                throw error;
            }))
    }



    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (this.authenticationService.isLoggedIn() && request.url.indexOf('basicauth') === -1) {
    //         const authRequest = request.clone({
    //             headers: new HttpHeaders({
    //                 'Content-Type': 'application/json',
    //                 'Authorization': this.authenticationService.getJwtToken()
    //             })
    //         });
    //         return next.handle(authRequest);
    //     } else {
    //         return next.handle(request);
    //     }
    // }
}