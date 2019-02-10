
import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from './../work-order.service';
import { WorkOrder } from './../../shared/workorder.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
   /*  if (typeof this.leadId !== 'undefined')     {
    this.leadId = this.route.snapshot.params.leadId;
    this.getSingleLeads();
  } else   {
    this.getAllWorkOrder();
  } */
  this.route.paramMap.subscribe(
    (params: ParamMap) => {
      this.leadId = params.get('leadId');
    }
  );
  this.getSingleLeads();
  }
  getSingleLeads() {
    this.workOrderService.viewAllWorkOrder(this.leadId).subscribe(data => {
      this.workOrder = data;
    }, error => {
      console.log(error);
    });
  }
  viewInvoice(row) {
    this.router.navigate(['invoice/viewinvoice',
    row.workOrderID]);
  }
  createProfomaInvoice(row) {
    this.router.navigate(['proformainvoice/createproformainvoice'
    , this.leadId, row._id]);
  }
  viewProfomaInvoice(row) {
    this.router.navigate(['proformainvoice/viewproformainvoice', row.workOrderID]);
  }
  createInvoice(row) {
    this.router.navigate(['invoice/createinvoice', this.leadId, row._id]);
  }
  getViewWorkOrder(data) {
    this.router.navigate(['workorder/viewsingleworkorder', data._id]);
  }
  getInvoice(data) {
    this.router.navigate(['createinvoice', this.leadId, data._id]);
  }
  getEditWorkOrder(data) {
    this.router.navigate(['editworkorder', this.leadId, data._id]);
  }
  getDeleteSingleWorkOrder(row) {
    this.workOrderService.deleteSingleWorkOrder(row._id).subscribe(data => {
      this.workOrder = data;
    }, error => {
      console.log(error);
    });
  }
  /* getAllWorkOrder() {
    this.workOrderService.allAllWorkOrder().subscribe(data => {
      const allWorkOrder = data.map().workOrder;
      this.workOrder = allWorkOrder;
    }, error => {
      console.log(error);
    });
  } */
}
