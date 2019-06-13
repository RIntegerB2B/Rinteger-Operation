import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/authguard/auth.guard';

const routes: Routes = [
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: './customer-management/customer.module#CustomersModule'
  },
  {
    path: 'lead',
    canActivate: [AuthGuard],
    loadChildren: './lead-management/lead-management.module#LeadManagementModule'
  },
  {
    path: 'activity-log',
    canActivate: [AuthGuard],
    loadChildren: './activity-log/activity-log.module#ActivityLogModule'
  },
  {
    path: 'workorder',
    canActivate: [AuthGuard],
    loadChildren: './work-order-management/work-order-management.module#WorkOrderManagementModule'
  },
  {
    path: 'marketing',
    canActivate: [AuthGuard],
    loadChildren: './marketing-management/marketing-management.module#MarketingManagementModule'
  },
  {
    path: 'quotation',
    canActivate: [AuthGuard],
    loadChildren: './quotation-management/quotation-management.module#QuotationManagementModule'
  },
  {
    path: 'invoice',
    canActivate: [AuthGuard],
    loadChildren: './invoice-management/invoice-management.module#InvoiceManagementModule'
  },
  {
    path: 'proformainvoice',
    canActivate: [AuthGuard],
    loadChildren: './proforma-invoice-management/proforma-invoice-management.module#ProformaInvoiceManagementModule'
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: './settings-management/settings-management.module#SettingsManagementModule'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: './account/account.module#AccountModule',
  },
  {
    path: 'expense',
    canActivate: [AuthGuard],
    loadChildren: './expense-management/expense.module#ExpenseModule',
  },
  {
    path: 'income',
    canActivate: [AuthGuard],
    loadChildren: './income-management/income.module#IncomeModule',
  },
  {
    path: 'ticket',
    canActivate: [AuthGuard],
    loadChildren: './ticket/ticket.module#TicketModule',
  },
  {
    path: 'task',
    canActivate: [AuthGuard],
    loadChildren: './task-management/task.module#TaskModule',
  },
  {
    path: 'material',
    canActivate: [AuthGuard],
    loadChildren: './material-management/material-management.module#MaterialModule',
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    loadChildren: './report/report.module#ReportModule',
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: './user-management/user-management.module#UserManagementModule',
  },
  {
    path: 'asset',
    canActivate: [AuthGuard],
    loadChildren: './asset-listing/asset-listing.module#AssetListingModule',
  },
  {
    path: 'shared',
    canActivate: [AuthGuard],
    loadChildren: './shared-module/shared-module.module#SharedModuleModule',
  },
  {
    path: '',
    redirectTo: 'account/login',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
