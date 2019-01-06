import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeadSettingsComponent } from './lead-settings/lead-settings.component';
import { WorkorderPdfTemplateComponent } from './workorder-pdf-template/workorder-pdf-template.component';

const routes: Routes = [
  {
    path: 'leadsettings',
    component: LeadSettingsComponent
  },
  {
    path: 'workorderpdf',
    component: WorkorderPdfTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule { }
