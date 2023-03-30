import { Component, NgModule } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { environment } from './environments/environment';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  protected isDashboard: boolean = false;
  protected isMainSlider: boolean = false;
  constructor(private router: Router) {

    // Here we manage site content relative to the specified location
    // Also we check if user is logged in and give access to the specific locations 
    
    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/dashboard") {
          this.isDashboard = true;
        } else {
          this.isDashboard = false;
        }
        if (event.url === "/home") {
          this.isMainSlider = true;
        } else {
          this.isMainSlider = false;
        }
      }
    });
  }
}