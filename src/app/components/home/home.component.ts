import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../services/case.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Case } from '../../model/case';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cases: Case[] = [];

  constructor(
    private caseService: CaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCases();
  }

  getCases(): void {
    this.caseService.getCases().subscribe(
      (cases: Case[]) => {
        console.log(JSON.stringify(cases))
        this.cases = cases;
      },
      (error) => {
        console.error('Error fetching cases', error);
      }
    );
  }

  onCreateCase(): void {
    const user = this.authService.getUserDetails();
    if (this.authService.getUserDetails()) {
      this.router.navigate(['/create-case']);
    } else {
      this.router.navigate(['/auth']);  
    }
  }

  goToCaseDetails(caseId: number) {
    console.log('Navigating to case:', caseId);
    this.router.navigate(['/case-details', caseId]);
  }
}
