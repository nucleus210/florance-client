import { Component, NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from './environments/environment';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  protected isDashboard: boolean = false;
  constructor(private router: Router){

    this.router.events.subscribe((event: NavigationEnd) => { console.log(event);
      if(event.url === "/dashboard"){
        this.isDashboard = true;
      } else {
        this.isDashboard = false;
      }});
  
  }
}