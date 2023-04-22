import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'response-codes-card-count',
  templateUrl: './http-response-codes-card-count.component.html',
  styleUrls: ['./http-response-codes-card-count.component.css']
})
export class HttpResponseCodesCardCountComponent implements OnInit {

  constructor(private dataService: DataService) {}
  traceResponse: any[] = [];
  serverOK:number = 0;
  serverError:number = 0;
  serverDeny:number = 0;

  ngOnInit(): void {
    this.dataService.httpResponseTracesPayload.subscribe(data => {
			console.log('Http response: ' + data);

        this.traceResponse = data;
        data.forEach((r: { status: any; }) => {if(r.status === 200) {
          this.serverOK ++;
        }else if(r.status === 500) {
          this.serverError ++;
        }else if(r.status === 404) { 
          this.serverDeny ++;
        }
         })
		  });

  }

}
