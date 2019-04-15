
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderSettingModel } from './../../shared/workorder-setting.model';
@Component({
  selector: 'app-search-workorder',
  templateUrl: './search-workorder.component.html',
  styleUrls: ['./search-workorder.component.css']
})
export class SearchWorkorderComponent implements OnInit {
  searchType = ['Name', 'MobileNumber' ];
  workOrderDetailsForm: FormGroup;
  @Input() workOrderModel: WorkOrder;
  @Input() workOrderSettingModel: WorkOrderSettingModel;
  @Input()  status: boolean;
  @Output() searchWorkOrder = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.workOrderDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchStatus(workOrderData, filter) {
    const filterData = workOrderData.filter(data => data.workOrderStatus.toUpperCase().indexOf(filter.toUpperCase()) > -1);
    this.searchWorkOrder.emit(filterData);
  }
  searchBy(workOrderData, selectType, filter) {
    switch (selectType) {
      case 'Name': {
        const filterData = workOrderData.filter(data => data.customerName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchWorkOrder.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        workOrderData.forEach(data => {
          if (!data.mobileNumber) {
            data.mobileNumber = '';
          }
        });
        const filterData = workOrderData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
        this.searchWorkOrder.emit(filterData);
        break;
      }
      case 'EmailId': {
        workOrderData.forEach(data => {
          if (!data.emailId) {
            data.emailId = '';
          }
        });
        const filterData = workOrderData.filter(data =>
          data.emailId.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchWorkOrder.emit(filterData);
        break;
      }
      case 'City': {
        workOrderData.forEach(data => {
          if (!data.city) {
            data.city = '';
          }
        });
        const filterData = workOrderData.filter(data =>
          data.city.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchWorkOrder.emit(filterData);
        break;
      }
      case 'Location': {
        workOrderData.forEach(data => {
          if (!data.location) {
            data.location = '';
          }
        });
        const filterData = workOrderData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchWorkOrder.emit(filterData);
        break;
      }
    }
  }
}
