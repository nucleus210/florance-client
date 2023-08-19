import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';
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
        console.log(data);
        return true;
      }));
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/login',
      loginRequestPayload).pipe(map(data => {
        console.log(data);

        const decodedToken = this.decodeJwt(data.access_token);
        const refreshToken = this.decodeJwt(data.refresh_token);

        this.localStorage.store('refreshToken', data.refresh_token);
        this.localStorage.store('authenticationToken', data.access_token);
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
    console.log(this.localStorage.retrieve('roles'));
    return this.localStorage.retrieve('roles');
  }
  getUserId(): number {
    return this.localStorage.retrieve('id');
  }
  getUserName() {
    this.loggedIn.emit(this.localStorage.retrieve('username'));
    return this.localStorage.retrieve('username');
  }

  async getRefreshToken() {
    const refreshToken = this.localStorage.retrieve('refreshToken');
    console.log(refreshToken)

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + refreshToken,
    }

    const requestOptions = {
      headers: new Headers(headerDict),
      method: "post"
    };

    await fetch(`http://localhost:8080/refresh-token`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log("Post refresh_token: " + data.refresh_token);
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('username');
        this.localStorage.clear('refreshToken');
        this.localStorage.clear('expiresAt');
        const decodedToken = this.decodeJwt(data.access_token);
        const refreshToken = this.decodeJwt(data.refresh_token)
        this.localStorage.store('refreshToken', data.refresh_token);
        this.localStorage.store('authenticationToken', data.access_token);
        this.localStorage.store('username', decodedToken.sub);
        this.localStorage.store('expiresAt', decodedToken.exp);
        this.localStorage.store('roles', decodedToken.authorities);
        console.log("Result post refresh_token: new token - " + decodedToken);
        this.loggedIn.emit(true);
        return true;
      }
      )
      .catch(error => console.log("Upload files error", JSON.stringify(error)))
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

  isTokenExpired(): boolean {
    if (this.getJwtToken() != null) {
      // console.log(this.decodeJwt(this.getJwtToken()));
      var token = this.getJwtToken();
      var decodeToken = this.decodeJwt(token);
      var exp = decodeToken.exp;
      var currentDate = new Date().getTime();
      // console.log(decodeToken);
      // console.log(exp);
      // console.log(currentDate);
      if (Date.now() >= exp * 1000) {
        return false;
      }

    }
    return true;
  }
}