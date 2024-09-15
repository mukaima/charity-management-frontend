import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: any[] = [];
  isAuthenticated: boolean = false;
  username: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  /*fetchCategories(): void {
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe(data => {
      this.categories = data;
    });
  }*/

  onSearchClick(): void {
    // Handle search click event
  }

  checkAuthentication(){
    const userDetails = this.authService.getUserDetails();
    if(userDetails){
      this.isAuthenticated = true;
      this.username = userDetails.username;
    }else{
      this.isAuthenticated = false;
      this.username =null;
    }
  }

  logout() {
    sessionStorage.removeItem('userdetails');
    sessionStorage.removeItem('XSRF-TOKEN');

    this.isAuthenticated = false;
    this.username = null;

    this.router.navigate(['/']);
  }
}
