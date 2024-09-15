import { Component, Input, OnInit } from '@angular/core';
import { Case } from '../../model/case';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {
  case!: Case;  

  constructor(private route: ActivatedRoute, private caseService: CaseService, private router: Router) {}

  ngOnInit(): void {
    const caseId = Number(this.route.snapshot.paramMap.get('id'));
    this.caseService.getCaseById(caseId).subscribe((data: any) => {
      this.case = data;
    });
  }

  shareCase(): void {

  }

  donateToCase(caseId: number): void {
    this.router.navigate(['/make-donation', caseId]);
  }
}
