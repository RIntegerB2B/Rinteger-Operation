
import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from './../work-order.service';
import { WorkOrder } from './../../shared/workorder.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-workorder',
  templateUrl: './view-workorder.component.html',
  styleUrls: ['./view-workorder.component.css'],
})
export class ViewWorkorderComponent implements OnInit {
  workOrder: WorkOrder[] = [];
  leadId;
  constructor(private workOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.leadId = this.route.snapshot.params.leadId;
    this.getSingleLeads();
  }
  getSingleLeads() {
    this.workOrderService.viewAllWorkOrder(this.leadId).subscribe(data => {
      this.workOrder = data;
      console.log('all work order', this.workOrder);
    }, error => {
      console.log(error);
    });
  }
  viewInvoice(row) {
    this.router.navigate(['invoice/viewinvoice', this.leadId, row]);
  }
  createProfomaInvoice(row) {
    this.router.navigate(['createproformainvoice', this.leadId, row._id]);
  }
  viewProfomaInvoice(row) {
    this.router.navigate(['viewproformainvoice', this.leadId, row]);
  }
  createInvoice(row) {
    this.router.navigate(['invoice/createinvoice', this.leadId, row._id]);
  }
  getViewWorkOrder(data) {
    console.log('dataData', data);
    this.router.navigate(['workorder/viewsingleworkorder', this.leadId, data._id]);
  }
  getInvoice(data) {
    this.router.navigate(['createinvoice', this.leadId, data._id]);
  }
  getEditWorkOrder(data) {
    this.router.navigate(['editworkorder', this.leadId, data._id]);
  }
  getDeleteSingleWorkOrder(row) {
    this.workOrderService.deleteSingleWorkOrder(this.leadId, row._id).subscribe(data => {
      this.workOrder = data;
      console.log('all work order', this.workOrder);
    }, error => {
      console.log(error);
    });
  }
}
