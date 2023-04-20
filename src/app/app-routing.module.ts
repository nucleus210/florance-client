import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebSiteModule } from './frond-end/website.module';
import AdminModule from './admin/admin.module';

const routes: Routes = [
  { path: '', redirectTo: '/api', pathMatch:'full'},
  { path: '', redirectTo: '/admin', pathMatch:'full'}];

@NgModule({
  imports: [AdminModule, WebSiteModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
