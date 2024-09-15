import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from '../model/case';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserCases(): Observable<any[]> {
    return this.http.get<Case[]>('/api/user/cases');
  }

  getUserDonations(): Observable<any[]> {
    return this.http.get<Case[]>('/api/user/donations');
  }

  updateUserDetails(userDetails: any): Observable<any> {
    return this.http.put('/api/user/update', userDetails);
  }

  deleteUserAccount(): Observable<any> {
    return this.http.delete('/api/user/delete');
  }
}
