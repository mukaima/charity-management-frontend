import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../../model/user';
import { LoginRequest } from '../../model/login.reques';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  loginReq: LoginRequest = new LoginRequest();

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let httpHeaders = new HttpHeaders();
    const isTargetMethod = req.method === 'POST' || req.method === 'PUT';

    if (typeof window !== 'undefined' && window.sessionStorage && isTargetMethod) {
      const userDetails = window.sessionStorage.getItem('userdetails');
      if (userDetails) {
        this.loginReq = JSON.parse(userDetails);
      }

      // Check if user details are present and set Authorization header
      if (this.loginReq && this.loginReq.password && this.loginReq.username) {
        httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.loginReq.username + ':' + this.loginReq.password));
      }

      // Set the XSRF token header if available
      const xsrf = window.sessionStorage.getItem('XSRF-TOKEN');
      if (xsrf) {
        httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);
      }
    }

    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');

    const xhr = req.clone({
      headers: httpHeaders
    });

    return next.handle(xhr).pipe(
      tap(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            }
          }
        }
      )
    );
  }
}
