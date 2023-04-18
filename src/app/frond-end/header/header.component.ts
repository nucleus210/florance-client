import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import {Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
	imports: [NgbDropdownModule, CommonModule, RouterModule],
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  username: string;
  public isLoggedIn: boolean = false;;
  public userRoles: any[];
  public isAdmin:boolean = false;;
  collapsed = true;
  isSecNav: boolean = false;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
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
    this.username = this.authService.getUserName();
  }

  onLogout(): void {
    console.log('onLogout');
    // log out user and clear user data from browser local storage
    this.authService.logout();
    // update username message
    this.username = 'user';
    // update variables
    this.isAdmin = false;
    // navigate to home page
    this.router.navigate(['/api/home']);
  }
  isLogged() {
    return this.authService.isLoggedIn();
  }
}
