import { LoginToken } from './LoginToken';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  constructor(private http: HttpClient, private _router: Router) { }

  registerService(user): Observable<LoginToken> {
    return this.http.post<LoginToken>(this._registerUrl, user);
  }

  loginUser(user): Observable<LoginToken> {
    return this.http.post<LoginToken>(this._loginUrl,user);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }
}
