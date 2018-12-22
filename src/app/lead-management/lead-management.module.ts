import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadManagementRoutingModule } from './lead-management-routing.module';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule,
    LeadManagementRoutingModule
  ]
})
export class LeadManagementModule { }
