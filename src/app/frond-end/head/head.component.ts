import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  standalone: true,
	imports: [NgbDropdownModule, CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  styleUrls: ['./head.component.css']
})

export class HeadComponent {
  public isLoggedIn: boolean = false;;
  public userRoles: any[];
  public isAdmin:boolean = false;;
  collapsed = true;
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
