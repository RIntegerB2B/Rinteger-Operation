import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';

const routes: Routes = [
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path: 'rolecreate', component: CreateRoleComponent
  },
  {
    path: 'customerregistration', component: CustomerRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
