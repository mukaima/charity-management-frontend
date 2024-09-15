import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../../model/Donation';
import { DonationService } from '../../services/donation.service';
import { Case } from '../../model/case';
import { CaseService } from '../../services/case.service';
import { NgForm } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-donation-page',
  templateUrl: './donation-page.component.html',
  styleUrls: ['./donation-page.component.css']
})
export class DonationPageComponent implements OnInit{
  donation: Donation = new Donation(); 
  donationAmount: number | null = null;
  selectedPaymentMethod: string = '';
  paymentMethods: string[] = ['Vodafone Cash', 'paypal'];
  caseId: number = 0;

  constructor(private router: Router, private donationService: DonationService, private route: ActivatedRoute, private caseService: CaseService) {}
  
  ngOnInit(): void {
    this.caseId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onDonate(form: NgForm): void {
    if (form.valid) {
      console.log('Donation Amount:', this.donationAmount);
      console.log('Selected Payment Method:', this.selectedPaymentMethod)

      this.donation.amount = this.donationAmount || 0;
      this.donation.paymenMethod = this.selectedPaymentMethod
      this.donation.caseId = this.caseId;
      //this.donation.caseDTO = this.case;

      this.donationService.makeDonation(this.donation).subscribe(
        response => console.log(JSON.stringify(response))
      );
       
    } else {
      console.error('Form is invalid.');
    }
  }
}
