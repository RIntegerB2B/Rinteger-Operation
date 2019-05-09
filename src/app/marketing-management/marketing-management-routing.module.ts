import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { DuplicateCustomerComponent } from './duplicate-customer/duplicate-customer.component';
/* import { MarketingResolve } from './view-all-marketing/marketing.resolve'; */

const routes: Routes = [
{
    path: 'upload',
    component: UploadMarketingManagementComponent
},
{
    path: 'view-all',
    component: ViewAllMarketingComponent,
   /*  resolve: {
      marketing: MarketingResolve
    } */
},
{
  path: 'creatematerial',
  component: CreateMarketingTitleComponent
},
{
  path: 'viewtitlelist/:id',
  component: ViewTitleListComponent
},
{
  path: 'createtitlelist/:id',
  component: CreateTitleListComponent
},
{
  path: 'editcompanylist/:id',
  component: EditCompanyListComponent
},
{
  path: 'viewsingle/:id',
  component: ViewSingleCompanyComponent
},
{
  path: 'edittitle/:id',
  component: EditTitleComponent
},
{
  path: 'updatestatus/:id',
  component: UpdateStatusComponent
},
{
  path: 'viewactivity/:id',
  component: ViewActivityComponent
},
{
  path: 'duplicate/:id',
  component: DuplicateCustomerComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]/* ,
  providers: [MarketingResolve] */
})
export class MarketingRoutingModule { }
