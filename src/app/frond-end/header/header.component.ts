import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Profile from 'src/app/shared/interfaces/account';
import { FormsModule, NgForm } from '@angular/forms';
import SearchModel from 'src/app/shared/interfaces/search-model';
import { SearchService } from 'src/app/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import Product from 'src/app/shared/interfaces/product';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, RouterModule, FormsModule, NgbCollapseModule],
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  queryPayload: any = {
    searchId: null,
    name: null,
    alias: null,
    shortDescription: null,
    fullDescription: null
  };
  isMenuCollapsed = true;

  userId: number;
  username: string;
  url: string = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
  profile: Profile | null = null;
  public isLoggedIn: boolean = false;;
  public userRoles: any[];
  public isAdmin: boolean = false;;
  collapsed = true;
  isSecNav: boolean = false;
  searchResult: SearchModel[] = [];
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  constructor(private authService: AuthService, private profileService: ProfileService,
    private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    //check if user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      // fetch user from browser local storage
      this.userRoles = this.authService.getUserRoles();
      this.username = this.authService.getUserName();
      this.userRoles.filter(role => { if (role === 'ROLE_ADMIN') { this.isAdmin = true; } });
    } else {
      this.username = "user";
    }
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
  isProfileAvaible() {
    if (this.authService.isLoggedIn()) {
      return this.profileService.getProfileByUsername(this.username);

    }
    return false;
  }

  /**
  * function for adding new product to database.
  *
  * @param event click event
  * @throws error when required params are not valid or link not found by relation name
  */
  async onSearchQuery(f: NgForm) {
    console.log("test: " + f.valid);
    if (f.valid) {
      console.log("search query: " + f.name);
      console.log("search query: " + JSON.stringify(this.queryPayload));
      this.searchService.searchQuery(this.queryPayload.name);

      // this.openConfirmationDialogAddNewProduct(this.productPayload);
      this.searchService.searchMultipleResources(this.queryPayload.name).subscribe({
        next: (collection: ResourceCollection<SearchModel>) => {
          const searchResult: Array<SearchModel> = collection.resources;
          this.searchResult = searchResult;
        },
        error: (error: HttpErrorResponse) => { console.log(error.message); }
      });
    }
  }

}
