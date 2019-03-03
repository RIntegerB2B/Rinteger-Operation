import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerManagementService } from './customer-management.service';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
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
import { CreateCustomerService } from './../customer-management/create-customer/create-customer.service';
import { UploadCustomerComponent } from './upload-customer/upload-customer.component';
import {MobileNumberPipe} from './pipe/mobile-number.pipe';
import { EmailidPipe } from './pipe/emailid.pipe';
import { NamePipe } from './pipe/name.pipe';
import { CityPipe } from './pipe/city.pipe';
@NgModule({
  declarations: [
     ViewCustomerComponent, CreateCustomerComponent , EditCustomerComponent, UploadCustomerComponent,
      MobileNumberPipe, EmailidPipe, NamePipe, CityPipe
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
    CustomerManagementService, CreateCustomerService
  ],
  entryComponents: [CreateCustomerComponent]
})
export class CustomersModule { }
