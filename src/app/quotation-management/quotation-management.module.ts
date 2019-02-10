import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuotationComponent } from './create-quotation/create-quotation.component';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
import { ViewSingleQuotationComponent } from './view-single-quotation/view-single-quotation.component';
import { QuotationManagementService } from './quotation-management.service';
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
import { QuotationRoutingModule  } from './quotation-routing.module';


@NgModule({
  declarations: [CreateQuotationComponent, ViewQuotationComponent, ViewSingleQuotationComponent],
  imports: [
    HttpClientModule,
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
    QuotationRoutingModule,
    MatNativeDateModule
  ],
  providers: [QuotationManagementService]
})
export class QuotationManagementModule { }
