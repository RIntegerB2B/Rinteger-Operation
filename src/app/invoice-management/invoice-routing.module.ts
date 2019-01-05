import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewSingleInvoiceComponent } from './view-single-invoice/view-single-invoice.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'createinvoice/:leadId/:workId',
    component: CreateInvoiceComponent
  },
  {
    path: 'viewinvoice/:leadId/:workId',
    component: ViewInvoiceComponent
  },
  {
    path: 'viewsingleinvoice/:leadId/:invId',
    component: ViewSingleInvoiceComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
