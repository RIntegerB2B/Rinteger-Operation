import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivityLogService } from './../activity-log.service';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderPdf } from './../../shared/workorderpdf.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-workorder',
  templateUrl: './view-workorder.component.html',
  styleUrls: ['./view-workorder.component.css']
})
export class ViewforWorkorderComponent implements OnInit {
  id: string;
  workOrder: any;
  customerID: any;
  customerModel: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private activityLogService: ActivityLogService) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.viewWorkOrder();
  }
  viewWorkOrder() {
    this.activityLogService.viewforSingleWorkOrder(this.id).subscribe(data => {
      this.workOrder = data;
      this.customerID = this.workOrder[0].customerID;
    }, error => {
      console.log(error);
    });
  }

  back() {
    this.router.navigate(['activity-log/viewallactivity']);
  }
}
