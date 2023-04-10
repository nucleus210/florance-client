
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']

})
export default class DashboardComponent  {
    isLoggedIn: boolean = false; 
    isMenuCollapsed = true;
    isProductsCollapsed = true;
    isOrdersCollapsed = true;
    isCategoriesCollapsed = true;
    isSubcategoryCollapsed = true;
    isUsersCollapsed = true;
    isMainSliderCollapsed = true;
    showFiller = true;
	public isCollapsed = false;

    onLogout(){
    
    }
}
