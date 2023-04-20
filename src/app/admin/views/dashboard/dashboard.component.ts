
import { Component } from '@angular/core';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent {
	isMenuCollapsed = true;
    isProductsCollapsed = true;
    isOrdersCollapsed = true;
    isCategoriesCollapsed = true;
    isSubcategoryCollapsed = true;
    isUsersCollapsed = true;
    showFiller = true;
	public isCollapsed = false;
  
}
