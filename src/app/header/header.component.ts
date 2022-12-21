import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isLoggedIn;
  public userRoles;
  public isAdmin;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRoles = this.authService.getUserRoles();
    this.isAdmin = this.userRoles.filter(role => {if(role.authority === 'ROLE_ADMIN'){this.isAdmin = true;
    console.log(this.isAdmin);}})
    console.log(this.userRoles);
  }

  onLogout(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/home']);

  }
}
