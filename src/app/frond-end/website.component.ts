import { Component, NgModule } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';


@Component({
  selector: 'website-root',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})

export class WebSiteComponent {
  protected isMainSlider: boolean = false;

  constructor(private router: Router) {

    // Here we manage site content relative to the specified location
    // Also we check if user is logged in and give access to the specific locations 
    
    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/home") {
          this.isMainSlider = true;
        } else {
          this.isMainSlider = false;
        }
      }
    });
  }
}