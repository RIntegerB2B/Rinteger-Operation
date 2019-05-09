import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskFormComponent } from './create-task-form/create-task-form.component';
import { ViewAllTaskComponent } from './view-all-task/view-all-task.component';
import { ViewSingleTaskComponent } from './view-single-task/view-single-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ReEditTaskComponent } from './re-edit-task/re-edit-task.component';
import { MainModelComponent } from './main-model/main-model.component';
import { ViewDevelopingUnitComponent } from './developing-unit/view-developing-unit/view-developing-unit.component';
import { CreateDevelopingUnitComponent } from './developing-unit/create-developing-unit/create-developing-unit.component';
import { ViewSingleDevelopingUnitComponent } from './developing-unit/view-single-developing-unit/view-single-developing-unit.component';
import { UpdateDevelopingUnitComponent } from './developing-unit/update-developing-unit/update-developing-unit.component';
import { EditDevelopingUnitComponent } from './developing-unit/edit-developing-unit/edit-developing-unit.component';

const routes: Routes = [{ path: 'create/:id', component: CreateTaskFormComponent},
{ path: 'viewtask/:id', component: ViewAllTaskComponent},
{ path: 'viewsingle/:id/:single', component: ViewSingleTaskComponent},
{ path: 'edittask/:id/:editview', component: EditTaskComponent},
{ path: 'reedittask/:id/:editview', component: ReEditTaskComponent},
{ path: 'mainmodel', component: MainModelComponent},
{ path: 'view-developing', component: ViewDevelopingUnitComponent},
{ path: 'createDeveloping', component: CreateDevelopingUnitComponent},
{ path: 'view-single-developing/:id', component: ViewSingleDevelopingUnitComponent},
{ path: 'update-developing/:id', component: UpdateDevelopingUnitComponent},
{ path: 'edit-developing/:id', component: EditDevelopingUnitComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
