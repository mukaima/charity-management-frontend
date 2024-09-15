import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { getCookie } from 'typescript-cookie';
import { LoginRequest } from '../../model/login.reques';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  loginReq = new LoginRequest();
  user = new User();
  repeatPassword: string = '';
  usernameTaken: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  validateUser(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.validateLoginDetails(this.loginReq).subscribe(responseData => {
        this.user = <any>responseData.body;
        this.user.authStatus = 'AUTH';
        let xsrf = getCookie('XSRF-TOKEN') || '';
        window.sessionStorage.setItem('XSRF-TOKEN', xsrf);
        window.sessionStorage.setItem('userdetails', JSON.stringify(this.user));
        this.router.navigate(['/']);
      });
    }
  }

  registerUser(signupForm: NgForm) {
    if (signupForm.valid && this.user.passwordHash === this.repeatPassword && !this.usernameTaken) {
      this.authService.registerUser(this.user).subscribe(responseData => {
        console.log(`${JSON.stringify(responseData)}`)
        this.toggleForm(); 
      });
    }
  }

  checkUsername(): void {
    if (this.user.username) {
      this.authService.checkUsernameExists(this.user.username).subscribe(isTaken => {
        this.usernameTaken = isTaken;
      });
    }
  }



  toggleForm() {
    this.isLoginMode = !this.isLoginMode;
  }
}
