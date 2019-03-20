import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerManagementService } from './customer-management.service';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatAutocompleteModule,
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
  MatDatepickerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateCustomerService } from './customer/create-customer/create-customer.service';
import { AlertDeleteService } from './shared/alert-delete/alert-delete.service';
import { UploadCustomerComponent } from './shared/upload-customer/upload-customer.component';
import { MobileNumberPipe } from './pipe/mobile-number.pipe';
import { EmailidPipe } from './pipe/emailid.pipe';
import { NamePipe } from './pipe/name.pipe';
import { CityPipe } from './pipe/city.pipe';
import { AlertDeleteComponent } from './shared/alert-delete/alert-delete.component';
import { SearchCustomerComponent } from './shared/search-customer/search-customer.component';
import { ViewSinglecustomerComponent } from './customer/view-singlecustomer/view-singlecustomer.component';
import { ViewsinglecustomerService } from './customer/view-singlecustomer/viewsinglecustomer.service';

@NgModule({
  declarations: [
    ViewCustomerComponent, CreateCustomerComponent, EditCustomerComponent, UploadCustomerComponent,
    MobileNumberPipe, EmailidPipe, NamePipe, CityPipe, AlertDeleteComponent, SearchCustomerComponent, ViewSinglecustomerComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    CustomersRoutingModule,
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
    MatAutocompleteModule,
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
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    CustomerManagementService, CreateCustomerService, AlertDeleteService,
    ViewsinglecustomerService
  ],
  entryComponents: [CreateCustomerComponent, AlertDeleteComponent, ViewSinglecustomerComponent]
})
export class CustomersModule { }
