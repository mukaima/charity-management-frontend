import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login.reques';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   
  
  getUserDetails() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return JSON.parse(window.sessionStorage.getItem('userdetails') || 'null');
    }
    return null;
  }
  
  
  constructor(private http: HttpClient) {
    
  }


  loginUrl = 'http://localhost:7070/api/auth/login';
  registerUrl = 'http://localhost:7070/api/auth/register';
  checkUsernameUrl = 'http://localhost:7070/api/auth/check-username';

  validateLoginDetails(obj: LoginRequest): Observable<any> {
    // Include the headers required by your backend
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post(`${this.loginUrl}`, obj, { headers, observe: 'response' });
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.checkUsernameUrl}?username=${username}`);
  }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.registerUrl}`, user, { headers, observe: 'response' });
  }

  
}
