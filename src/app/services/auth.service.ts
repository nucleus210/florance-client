import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { LoginRequestPayload } from '../frond-end/views/auth/login/login-request.payload';
import { LoginResponse } from '../frond-end/views/auth/login/login-response.payload';
import { RegisterRequestPayload } from '../frond-end/views/auth/register/register.payload';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() password: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
  }

  register(registerRequestPayload: RegisterRequestPayload): Observable<any> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/register',
      registerRequestPayload, httpOptions).pipe(map(data => {
        const decodedToken = this.decodeJwt(data)
        this.localStorage.store('authenticationToken', data);
        this.localStorage.store('username', decodedToken.sub);
        this.localStorage.store('expiresAt', decodedToken.exp);
        this.localStorage.store('roles', decodedToken.authorities);
        console.log(decodedToken);
        this.loggedIn.emit(true);

        return true;
      }));
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/login',
      loginRequestPayload).pipe(map(data => {
        const decodedToken = this.decodeJwt(data)
        this.localStorage.store('authenticationToken', data);
        this.localStorage.store('username', decodedToken.sub);
        this.localStorage.store('expiresAt', decodedToken.exp);
        this.localStorage.store('roles', decodedToken.authorities);
        console.log(decodedToken);
        this.loggedIn.emit(true);
        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  logout() {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
  getUserRoles() {
    return this.localStorage.retrieve('roles');
  }
  getUserName() {
    this.loggedIn.emit(this.localStorage.retrieve('username'));
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  decodeJwt(token: any) {
    const tokenResponse = token.replace("Bearer ", "");
    var base64Url = tokenResponse.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    let decodedToken = JSON.parse(jsonPayload);
    return decodedToken;
  };
}