import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Routing module for page navigation
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // For forms handling
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // For HTTP requests

// Import the components you've created
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
;

// Services
import { AuthComponent } from './components/auth/auth.component';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { XhrInterceptor } from './components/interceptor/app.request.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CaseDetailsComponent } from './components/case-details/case-details.component';
import { DonationPageComponent } from './components/donation-page/donation-page.component';
@NgModule({
  declarations: [
    // Declare all components that are part of this module
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    CreateCaseComponent,
    UserProfileComponent,
    CaseDetailsComponent,
    DonationPageComponent,
  ],
  imports: [
    // Import necessary modules
    BrowserModule,
    AppRoutingModule, // Handles routing across pages
    FormsModule, // Template-driven forms
    ReactiveFormsModule, // Reactive forms
    HttpClientModule, // For making HTTP requests to the backend
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent] // Root component to bootstrap the app
})
export class AppModule { }
