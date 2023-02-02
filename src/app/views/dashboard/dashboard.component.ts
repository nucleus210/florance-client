
import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { AppModule } from "../../app.module";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
	isMenuCollapsed = true;
    isCollapsed = true;
    isProductsCollapsed = true;
    isCategoriesCollapsed = true;
    isSubcategoryCollapsed = true;
    isUsersCollapsed = true;
    showFiller = true;
}
