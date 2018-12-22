import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: './customer-management/customer.module#CustomersModule'
  },
  {
  path: 'lead',
  loadChildren: './lead-management/lead-management.module#LeadManagementModule'
},
{
  path: '',
  redirectTo: '',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
