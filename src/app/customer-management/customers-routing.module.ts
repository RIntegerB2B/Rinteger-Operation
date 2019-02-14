import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


const routes: Routes = [
  /* {
    path: 'createcustomer',
    component: CreateCustomerComponent
  }, */
  {
    path: 'viewcustomer',
    component: ViewCustomerComponent
  },
  {
    path: 'editcustomer/:id',
    component: EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

