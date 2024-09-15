import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CaseDetailsComponent } from './components/case-details/case-details.component';
import { DonationPageComponent } from './components/donation-page/donation-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent},
  { path: 'create-case', component: CreateCaseComponent},
  { path: 'me', component: UserProfileComponent},
  { path: 'case-details/:id', component: CaseDetailsComponent},
  { path: 'make-donation/:id', component: DonationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
