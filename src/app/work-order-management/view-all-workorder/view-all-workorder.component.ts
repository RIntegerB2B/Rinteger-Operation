import { Component, OnInit } from '@angular/core';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderService } from './../work-order.service';
@Component({
  selector: 'app-view-all-workorder',
  templateUrl: './view-all-workorder.component.html',
  styleUrls: ['./view-all-workorder.component.css']
})
export class ViewAllWorkorderComponent implements OnInit {
  workOrderModel: WorkOrder[] = [];
  constructor(private workOrderService: WorkOrderService) { }

  ngOnInit() {
    this.getAllWorkOrder();
  }
  getAllWorkOrder() {
    this.workOrderService.allWorkOrder().subscribe(data => {
      this.workOrderModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
}
