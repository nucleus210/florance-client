
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']

})
export default class AdminComponent  {
    username: string;
    userRoles: any
    isAdmin: boolean = false;
    isLoggedIn: boolean = false; 
    isMenuCollapsed = true;
    isCollapsedBlog = false;
    isProductsCollapsed = true;
    isOrdersCollapsed = true;
    isCategoriesCollapsed = true;
    isSubcategoryCollapsed = true;
    isUsersCollapsed = true;
    isMainSliderCollapsed = true;
    showFiller = true;
	public isCollapsed = false;
    constructor(private authService: AuthService, private router: Router) { }
    
      ngOnInit(): void {
        //check if user is logged in
        this.isLoggedIn = this.authService.isLoggedIn();
        console.log(this.isLoggedIn);
        if (!this.authService.isLoggedIn()) {
            // user is not logged in and redirect to login page
            this.router.navigate(['/api/page-not-found']);
          }
        // fetch user from browser local storage
        this.userRoles = this.authService.getUserRoles();
        this.username = this.authService.getUserName();
        if (this.username == null) {
          this.username = "user";
        }
    
        // Check if user is logged in with ADMIN role authority
        this.userRoles.filter(role => { if (role === 'ROLE_ADMIN') { this.isAdmin = true; } });
   
    
 
    
    
      }
    onLogout(){
    
    }
    isLogged() {
        return this.authService.isLoggedIn();
      }
      redirectToPageNotFound() {
        this.router.navigate(['/page']);
      }
}
