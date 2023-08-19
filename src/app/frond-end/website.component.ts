import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'website-root',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
  providers: [DataService]
})

export class WebSiteComponent implements OnInit{
@Input() isSecNav: boolean = false;
@Input()   isMainSlider: boolean = false;
  // protected isSecNav: boolean = false;
  // protected isMainSlider: boolean = false;
  constructor(private router: Router, private dataService: DataService) {

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

  ngOnInit() {
   // Observe sort option selected from sec navbar filter menu
   this.dataService.isSecNav.subscribe(data => {
    if(data) {
      this.isSecNav = data;
    }
  });
  }
  onSecNavTurnOnEvent(event: any) {
    console.log("IsSecNav" + event);
  }
}