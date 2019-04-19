import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskRoutingModule } from './task-routing.module';
import {MatBadgeModule} from '@angular/material/badge';

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
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateTaskFormComponent } from './create-task-form/create-task-form.component';
import { TaskManagementService } from './task-management.service';
import { ViewAllTaskComponent } from './view-all-task/view-all-task.component';
import { ViewSingleTaskComponent } from './view-single-task/view-single-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ReEditTaskComponent } from './re-edit-task/re-edit-task.component';
import { ViewModuleComponent } from './view-module/view-module.component';
import { ViewShootComponent } from './view-shoot/view-shoot.component';
import { ViewListComponent } from './view-list/view-list.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { RatingComponent } from './rating/rating.component';
@NgModule({
  declarations: [CreateTaskFormComponent, ViewAllTaskComponent,
     ViewSingleTaskComponent, EditTaskComponent, ViewProductComponent,
      ReEditTaskComponent, ViewModuleComponent, ViewShootComponent, ViewListComponent, SearchTaskComponent, RatingComponent],
  imports: [
    CommonModule,
     HttpModule,
   FormsModule, ReactiveFormsModule, MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    FlexLayoutModule,
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
    TaskRoutingModule
  ],
  providers: [TaskManagementService],
  entryComponents: [ViewAllTaskComponent]
})
export class TaskModule { }
