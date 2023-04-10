
import { Component } from '@angular/core';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './dashboard-main.component.html',
    styleUrls: ['./dashboard-main.component.css']

})
export class DashboardMainComponent {
	isMenuCollapsed = true;
    isProductsCollapsed = true;
    isOrdersCollapsed = true;
    isCategoriesCollapsed = true;
    isSubcategoryCollapsed = true;
    isUsersCollapsed = true;
    showFiller = true;
	public isCollapsed = false;
  
}
