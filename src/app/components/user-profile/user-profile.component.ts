import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CaseService } from '../../services/case.service';
import { User } from '../../model/user';
import { Case } from '../../model/case';
import { Donation } from '../../model/Donation';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  userCases: Case[] = [];
  userDonations: Donation[] = [];
  caseTitles: { [key: number]: string } = {};

  constructor(
    private authService: AuthService,
    private caseService: CaseService,
    private donationService: DonationService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.user = this.authService.getUserDetails();
    this.getUserCases();
    this.getUserDonations();
  }

  getUserCases() {
    this.caseService.getCasesByUser(this.user.username).subscribe(
      (cases: Case[]) => {
        this.userCases = cases;
      },
      (error) => {
        console.error('Error fetching user cases', error);
      }
    );
  }

  getUserDonations() {
    this.donationService.getUserDonations(this.user.username).subscribe(
      (donations: Donation[]) => {
        this.userDonations = donations;
        this.getCaseTitlesForDonations(donations);
        console.log(JSON.stringify(donations));
      },
      (error) => {
        console.error('Error fetching user donations', error);
      }
    );
  }

  getCaseTitlesForDonations(donations: Donation[]) {
    donations.forEach((donation) => {
      this.caseService.getCaseById(donation.caseId).subscribe(
        (userCase: Case) => {
          this.caseTitles[donation.caseId] = userCase.title;  
        },
        (error) => {
          console.error('Error fetching case title for donation', error);
        }
      );
    });
  }

  manageCase(userCase: Case) {
    // Navigate to manage case page
    // e.g., this.router.navigate(['/manage-case', userCase.id]);
  }

  editProfile() {
    // Open settings or profile editing modal
  }
}
