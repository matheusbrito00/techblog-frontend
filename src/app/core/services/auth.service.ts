import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.backendUrl;
  isLoggedSub = new BehaviorSubject<boolean>(!!this.userToken);
  isLogged$ = this.isLoggedSub.asObservable();

  constructor(private http: HttpClient) {}

  signIn(payload: any): Observable<any> {
    return this.http.post(`${this.url}/auth/signin`, payload);
  }

  validateToken(): Observable<any> {
    return this.http.get(`${this.url}/auth/me`);
  }

  // signUp(payload: any): Observable<any> {
  //   return this.http.post(`${this.url}/auth/signup`, payload);
  // }

  get userToken() {
    return localStorage.getItem('userToken');
  }
}
