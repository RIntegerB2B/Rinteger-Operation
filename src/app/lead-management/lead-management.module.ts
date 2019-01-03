import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadManagementRoutingModule } from './lead-management-routing.module';
import { SampleComponent } from './sample/sample.component';
import { LeadAddComponent } from './lead-add/lead-add.component';
import { LeadEditComponent } from './lead-edit/lead-edit.component';
import { ViewRequirementsComponent } from './view-requirements/view-requirements.component';
import { ViewLeadComponent } from './view-lead/view-lead.component';
import { ViewFollowupComponent } from './view-followup/view-followup.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeadManagementService } from './../lead-management/lead-management.service';
import { CustomersModule } from './../customer-management/customer.module';
import { CustomerManagementService } from './../customer-management/customer-management.service';
import { ViewSingleLeadComponent } from './view-single-lead/view-single-lead.component';

@NgModule({
  declarations: [SampleComponent,
    LeadAddComponent,
    LeadEditComponent,
    ViewRequirementsComponent,
    ViewLeadComponent,
    ViewFollowupComponent,
    ViewSingleLeadComponent],
  imports: [
    CommonModule,
    CustomersModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    CommonModule,
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
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LeadManagementRoutingModule
  ],
  providers: [
    LeadManagementService, CustomerManagementService
  ]
})
export class LeadManagementModule { }

