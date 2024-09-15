import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Donation } from "../model/Donation";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class DonationService{
    
    private userDonationsUrl = 'http://localhost:7070/api/donations';
    constructor(private http: HttpClient) {}
    
    getUserDonations(username: string): Observable<Donation[]> {
        return this.http.get<Donation[]>(`${this.userDonationsUrl}/me?username=${username}`);
    }

    makeDonation(donation: Donation): Observable<Donation>{
      return this.http.post<Donation>(`${this.userDonationsUrl}/makeDonation`, donation)
    }
}