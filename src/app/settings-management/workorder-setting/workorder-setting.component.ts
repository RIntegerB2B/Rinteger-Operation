import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { WorkOrderSettingModel } from './../../shared/workorder-setting.model';

@Component({
  selector: 'app-workorder-setting',
  templateUrl: './workorder-setting.component.html',
  styleUrls: ['./workorder-setting.component.css']
})
export class WorkorderSettingComponent implements OnInit {
  workOrderSettingForm: FormGroup;
  workOrderStatusTrue = false;
  workOrderSettingModel: WorkOrderSettingModel;
  message: string;
  action: string;
  constructor(private fb: FormBuilder,
     private  settingsServiceService: SettingsServiceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.showWorkOrderStatus();
    this.viewWorkOrder();
  }
  createForm() {
    this.workOrderSettingForm = this.fb.group({
      workOrderStatus: ['', Validators.required]
    });
  }
  showWorkOrderStatus() {
    this.workOrderStatusTrue = true;
  }

  addWorkOrderStatus() {
    this.message = 'workorder added successfully';
    this.workOrderSettingModel = new WorkOrderSettingModel();
    this.workOrderSettingModel.workOrderStatus = this.workOrderSettingForm.controls.workOrderStatus.value;
    this.settingsServiceService.addWorkOrderSetting(this.workOrderSettingModel).subscribe(data => {
      this.workOrderSettingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.workOrderSettingForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewWorkOrder() {
    this.settingsServiceService.viewWorkOrderSetting().subscribe(data => {
      this.workOrderSettingModel = data;
    }, err => {
      console.log(err);
    });
  }
  deleteWorkOrderStatus(value) {
    this.message = 'status deleted successfully';
    this.settingsServiceService.deleteWorkOrderSetting(value).subscribe(data => {
      this.workOrderSettingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
}
