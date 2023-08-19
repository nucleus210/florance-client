import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxHateoasClientModule } from '@lagoshny/ngx-hateoas-client';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { WebSiteModule } from './frond-end/website.module';
import AdminModule from './admin/admin.module';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    WebSiteModule,
    AdminModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgxHateoasClientModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    NgChartsModule,

  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false } },
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  { provide: DataService }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
