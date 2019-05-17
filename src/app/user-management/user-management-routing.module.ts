import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ViewCustomerRegistrationComponent } from './view-customer-registration/view-customer-registration.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path: 'rolecreate', component: CreateRoleComponent
  },
  {
    path: 'customerregistration', component: CustomerRegistrationComponent
  },
  {
    path: 'viewregistereduser', component: ViewUsersComponent
  },
  {
    path: 'editregistereduser/:id', component: EditUsersComponent
  },
  {
    path: 'viewcustomerregistration', component: ViewCustomerRegistrationComponent
  },
  {
    path: 'editregisteredcustomer/:id' , component: EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
