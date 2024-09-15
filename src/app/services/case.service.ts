import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from '../model/case';
import { Category } from '../model/category';
import { Donation } from '../model/Donation';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  
  
  private apiUrl = 'http://localhost:7070/api/cases';
  private categoryUrl = 'http://localhost:7070/api/categories';
  
  constructor(private http: HttpClient) {}

  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.apiUrl}/showCases`);
  }

  createCase(caseObj: Case, categoryName: string): Observable<any>{
    console.log('case to be created -> ' + JSON.stringify(caseObj));
    return this.http.post<Case>(`${this.apiUrl}/createCase?categoryName=${categoryName}`, caseObj);
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.categoryUrl}/getAll`);
  }

  getCasesByUser(username: string): Observable<Case[]> {
    return this.http.get<Case[]>(`${this.apiUrl}/me?username=${username}`);
  }

  getCaseById(caseId: number): Observable<Case>{
    return this.http.get<Case>(`${this.apiUrl}/id?caseId=${caseId}`);
  }

  
}
