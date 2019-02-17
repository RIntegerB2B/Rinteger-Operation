import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { UploadCustomerComponent } from './upload-customer/upload-customer.component';

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
  },
  {
    path: 'upload',
    component: UploadCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

