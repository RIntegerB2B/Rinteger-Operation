import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProformaComponent } from './create-proforma/create-proforma.component';
import { ViewSingleProformaComponent } from './view-single-proforma/view-single-proforma.component';
import { ViewProformaComponent } from './view-proforma/view-proforma.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'createproformainvoice/:leadId/:workId',
    component: CreateProformaComponent
  },
{
  path: 'viewsingleproformainvoice/:leadId/:pinvId',
  component: ViewSingleProformaComponent
},
{
  path: 'viewproformainvoice/:leadId/:workId',
  component: ViewProformaComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
