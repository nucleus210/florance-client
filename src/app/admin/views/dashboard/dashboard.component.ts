
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DataService } from 'src/app/services/data.service';


interface IRequest{
    uri: string;
    method: string;
    headers: any[]
}
interface IResponse{
    status: string;
    headers: any[]
}

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
    traceRequest: IRequest[] = [];
    traceResponse: any[] = [];

    constructor (private dashboardService: DashboardService, private dataService: DataService) {}


    serverOK:number = 0;
    serverError:number = 0;
    serverDeny:number = 0;

    ngOnInit(): void {
        this.getHttpTraces();

    }
    getHttpTraces() {
        this.dashboardService.getHttpTraces().subscribe(data => {
            console.log(data.exchanges);
            let traces: IRequest[] = [];
            let tracesResponse: IRequest[] = [];
            this.traceRequest = data.exchanges.request;
            data.exchanges.forEach(r => traces.push(r.request));
            data.exchanges.forEach(r => tracesResponse.push(r.response));

            this.traceRequest = traces;
            this.traceResponse = tracesResponse;
            console.log(this.traceRequest);
            console.log(this.traceResponse);

            this.dataService.emitHttpTracesToTableComponent(this.traceRequest, this.traceResponse);


        })
    }

	isMenuCollapsed = true;
    isProductsCollapsed = true;
    isOrdersCollapsed = true;
    isCategoriesCollapsed = true;
    isSubcategoryCollapsed = true;
    isUsersCollapsed = true;
    showFiller = true;
	public isCollapsed = false;
  
}
