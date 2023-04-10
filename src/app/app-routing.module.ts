import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebSiteModule } from './frond-end/website.module';
import DashboardModule from './admin/dashboard.module';

const routes: Routes = [
  { path: '', redirectTo: '/api', pathMatch:'full'},
  { path: '', redirectTo: '/admin', pathMatch:'full'}];

@NgModule({
  imports: [DashboardModule, WebSiteModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
