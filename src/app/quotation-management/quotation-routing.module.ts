import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuotationComponent } from './create-quotation/create-quotation.component';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
import { ViewSingleQuotationComponent } from './view-single-quotation/view-single-quotation.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'createquotation/:id/:leadId',
    component: CreateQuotationComponent
  },
  {
    path: 'viewquotation/:leadId',
    component: ViewQuotationComponent
  },
  {
    path: 'viewquotation/',
    component: ViewQuotationComponent
  },
  {
    path: 'viewsinglequotation/:quoId',
    component: ViewSingleQuotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
