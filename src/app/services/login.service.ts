import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { getTokenSourceMapRange } from 'typescript';
import { Router } from '@angular/router';
// import { APIUrls } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginFromTokenUrl = 'https://demo.credy.in/api/v1/usermodule/login/';
  private httpOptions: any;
  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //  Authorization: 'Bearer ' + localStorage.getItem('auth_token')
      }),
    };
  }

  loginFromToken(body: any): Observable<any> {
    return this.http
      .post(this.loginFromTokenUrl, body, this.httpOptions)
      .pipe(map((response) => response));
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  logoutUser() {
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return !!localStorage.getItem('Token');
  }
}
