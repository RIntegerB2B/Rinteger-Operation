import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { ActivityLogService } from './activity-log.service';
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
  MatDatepickerModule, 
  MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewAllActivityComponent } from './view-all-activity/view-all-activity.component';
import { CreateMonthlySheetComponent } from './create-monthly-sheet/create-monthly-sheet.component';
import { CreateWeeklySheetComponent } from './create-weekly-sheet/create-weekly-sheet.component';
import { ViewMonthlySheetComponent } from './view-monthly-sheet/view-monthly-sheet.component';
import { ViewWeekSheetComponent } from './view-week-sheet/view-week-sheet.component';
import { ViewListComponent } from './view-list/view-list.component';
import { EditMonthlyPlanSheetComponent } from './edit-monthly-plan-sheet/edit-monthly-plan-sheet.component';




@NgModule({
  declarations: [ ViewAllActivityComponent, CreateMonthlySheetComponent, CreateWeeklySheetComponent, ViewMonthlySheetComponent, ViewWeekSheetComponent, ViewListComponent, EditMonthlyPlanSheetComponent],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    ActivityLogRoutingModule,
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
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    ActivityLogService
  ],
  entryComponents: []
})
export class ActivityLogModule { }
