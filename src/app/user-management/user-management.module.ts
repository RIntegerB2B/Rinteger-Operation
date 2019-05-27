import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CreateRoleComponent } from './create-role/create-role.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ViewCustomerRegistrationComponent } from './view-customer-registration/view-customer-registration.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { SubscribedCustomerComponent } from './subscribed-customer/subscribed-customer.component';
import { SearchComponent } from './search/search.component';
import { SearchUserComponent } from './search-user/search-user.component';

@NgModule({
  declarations: [RegistrationComponent,
     CreateRoleComponent, CustomerRegistrationComponent,
      ViewUsersComponent, EditUsersComponent,
       ViewCustomerRegistrationComponent, EditCustomerComponent,
        SubscribedCustomerComponent, SearchComponent, SearchUserComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class UserManagementModule { }
