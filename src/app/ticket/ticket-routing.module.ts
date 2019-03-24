import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketComponent } from './ticket/ticket.component';
import { TicketViewComponent } from './../ticket/ticket-view/ticket-view.component';
import { UniqueTicketComponent } from './unique-ticket/unique-ticket.component';
import { UnitwiseViewComponent } from './unitwise-view/unitwise-view.component';
import { from } from 'rxjs';
const routes: Routes = [{ path: 'create', component: TicketComponent },
{ path: 'view', component: TicketViewComponent },
{ path: 'uniqueview/:id', component: UniqueTicketComponent },
{ path: 'unitwiseview', component: UnitwiseViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
