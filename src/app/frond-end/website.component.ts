import { Component, NgModule, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'website-root',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})

export class WebSiteComponent{

  protected isMainSlider: boolean = false;
  protected isSecNav: boolean = false;
 
  constructor(private router: Router) {

    // Here we manage site content relative to the specified location
    // Also we check if user is logged in and give access to the specific locations 
    
    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/api/home") {
          this.isMainSlider = true;
        } else {
          this.isMainSlider = false;
        }
        if (event.url === "/api/product-list") {
          this.isSecNav = true;
        } else {
          this.isSecNav = false;
        }
      }
    });
  }
 
}