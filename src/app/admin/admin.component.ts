
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'dashboard-component',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']

})
export default class AdminComponent  {
    isLoggedIn: boolean = false; 
    isMenuCollapsed = true;
    isCollapsedBlog = false;
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
