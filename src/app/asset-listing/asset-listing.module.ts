import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetListingRoutingModule } from './asset-listing-routing.module';
import { AssetListingService } from './asset-listing.service';
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
import { ViewAllAssetListingComponent } from './view-all-asset-listing/view-all-asset-listing.component';
import { CreateAssetListingComponent } from './create-asset-listing/create-asset-listing.component';
import { ViewSingleComponent } from './view-single/view-single.component';
import { EditAssetListingComponent } from './edit-asset-listing/edit-asset-listing.component';
import { UpdateAssetListingComponent } from './update-asset-listing/update-asset-listing.component';
import { ViewAvailabiliyComponent } from './view-availabiliy/view-availabiliy.component';
import { SearchComponent } from './search/search.component';




@NgModule({
  declarations: [ViewAllAssetListingComponent, CreateAssetListingComponent, ViewSingleComponent, EditAssetListingComponent, UpdateAssetListingComponent, ViewAvailabiliyComponent, SearchComponent],
  imports: [
    HttpClientModule,
    HttpModule,
    CommonModule,
    AssetListingRoutingModule,
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
    AssetListingService
  ],
  entryComponents: []
})
export class AssetListingModule { }
