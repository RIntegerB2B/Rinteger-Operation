import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWorkorderComponent } from './create-workorder/create-workorder.component';
import { ViewSingleWorkorderComponent } from './view-single-workorder/view-single-workorder.component';
import { EditWorkorderComponent } from './edit-workorder/edit-workorder.component';
import { ViewWorkorderComponent } from './view-workorder/view-workorder.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CreateWorkorderComponent,
    ViewSingleWorkorderComponent,
    EditWorkorderComponent,
    ViewWorkorderComponent],
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
export class WorkOrderManagementModule { }
