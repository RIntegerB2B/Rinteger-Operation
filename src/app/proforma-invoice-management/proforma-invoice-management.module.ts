import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProformaComponent } from './create-proforma/create-proforma.component';
import { ViewSingleProformaComponent } from './view-single-proforma/view-single-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
  MatDatepickerModule
} from '@angular/material';


@NgModule({
  declarations: [CreateProformaComponent,
    ViewSingleProformaComponent, ViewProformaComponent],
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
      FlexLayoutModule
    ],
})
export class ProformaInvoiceManagementModule { }
