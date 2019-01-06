import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProformaComponent } from './create-proforma/create-proforma.component';
import { ViewSingleProformaComponent } from './view-single-proforma/view-single-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProformaInvoiceService } from './proforma-invoice.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { ProformaRoutingModule } from './proforma-routing.module';

@NgModule({
  declarations: [CreateProformaComponent,
    ViewSingleProformaComponent, ViewProformaComponent],
    imports: [
      ProformaRoutingModule,
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
      MatNativeDateModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule
    ],
    providers: [ProformaInvoiceService]
})
export class ProformaInvoiceManagementModule { }
