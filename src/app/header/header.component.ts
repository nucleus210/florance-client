import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  public isLoggedIn: boolean = false;;
  public userRoles: any[];
  public isAdmin:boolean = false;;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    //check if user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    // fetch user from browser local storage
    this.userRoles = this.authService.getUserRoles();
    // Check if user is logged in with ADMIN role authority
    this.userRoles.filter(role => {if(role.authority === 'ROLE_ADMIN'){this.isAdmin = true;}});
    console.log(this.isAdmin);
    console.log(this.userRoles);
  }

  onLogout(): void {
    console.log('onLogout');
    // log out user and clear user data from browser local storage
    this.authService.logout();
    // update variables
    this.isAdmin = false;
    // navigate to home page
    this.router.navigate(['/product-list']);
  }
}
