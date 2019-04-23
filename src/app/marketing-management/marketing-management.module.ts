import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingRoutingModule } from './marketing-management-routing.module';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MarketingManagementService } from './marketing-management.service';
import { UploadMarketingManagementComponent } from './upload-marketing-management/upload-marketing-management.component';
import { ViewAllMarketingComponent } from './view-all-marketing/view-all-marketing.component';
import { CreateMarketingTitleComponent } from './create-marketing-title/create-marketing-title.component';
import { ViewTitleListComponent } from './view-title-list/view-title-list.component';
import { CreateTitleListComponent } from './create-title-list/create-title-list.component';
import { EditCompanyListComponent } from './edit-company-list/edit-company-list.component';
import { ViewSingleCompanyComponent } from './view-single-company/view-single-company.component';
import { EditTitleComponent } from './edit-title/edit-title.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { ViewActivityComponent } from './view-activity/view-activity.component';



@NgModule({
  declarations: [UploadMarketingManagementComponent, ViewAllMarketingComponent,
     CreateMarketingTitleComponent, ViewTitleListComponent, CreateTitleListComponent,
      EditCompanyListComponent, ViewSingleCompanyComponent, EditTitleComponent,
       UpdateStatusComponent, ViewActivityComponent],
  imports: [
    CommonModule,
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
    MarketingRoutingModule,
    MatAutocompleteModule
  ],
  providers: [ MarketingManagementService]
})
export class MarketingManagementModule { }

