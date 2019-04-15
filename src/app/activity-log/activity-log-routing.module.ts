import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllActivityComponent } from './view-all-activity/view-all-activity.component';
import { CreateMonthlySheetComponent } from './create-monthly-sheet/create-monthly-sheet.component';
import { ViewMonthlySheetComponent } from './view-monthly-sheet/view-monthly-sheet.component';
import { CreateWeeklySheetComponent } from './create-weekly-sheet/create-weekly-sheet.component';
import { ViewWeekSheetComponent } from './view-week-sheet/view-week-sheet.component';
import { fromEventPattern } from 'rxjs';
const routes: Routes = [
    { path: 'viewallactivity', component: ViewAllActivityComponent},
    { path: 'createmonthly/:id', component: CreateMonthlySheetComponent},
    { path: 'viewallmonthly', component: ViewMonthlySheetComponent},
    { path: 'createweekly/:id', component: CreateWeeklySheetComponent},
    { path: 'viewweek', component: ViewWeekSheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityLogRoutingModule { }

