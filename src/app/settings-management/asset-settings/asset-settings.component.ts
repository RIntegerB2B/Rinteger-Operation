
import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { AssetListingSettingModel } from './../../shared/asset-listing-setting.model';

@Component({
  selector: 'app-asset-settings',
  templateUrl: './asset-settings.component.html',
  styleUrls: ['./asset-settings.component.css']
})
export class AssetSettingsComponent implements OnInit {
  AssetSettingForm: FormGroup;
  showDepartment: boolean;
  showStatus: boolean;
  settingModel: AssetListingSettingModel;
  action;
  message;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private settingsService: SettingsServiceService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.viewAssetSetting();
  }
  createForm() {
    this.AssetSettingForm = this.fb.group({
      department: [''],
      availableStatus: ['']
    });
  }
  showDepartmentForm() {
    this.showDepartment = true;
    this.showStatus = false;
  }
  showStatusForm() {
    this.showDepartment = false;
    this.showStatus = true;
  }
  viewAssetSetting() {
    this.settingsService.viewAssetSetting().subscribe(data => {
      this.settingModel = data;
    }, err => {
      console.log(err);
    });
  }
  addDepartment() {
    this.message = 'Department added Successfully';
    this.settingModel = new AssetListingSettingModel();
    this.settingModel.department = this.AssetSettingForm.controls.department.value;
    this.settingsService.addAssetDeparment(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.AssetSettingForm.reset();
  }
  deleteDepartment(value) {
    this.message = 'Department deleted Successfully';
    this.settingsService.deleteAssetDeparment(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  addStatus() {
    this.message = 'Stauts added Successfully';
    this.settingModel = new AssetListingSettingModel();
    this.settingModel.availableStatus = this.AssetSettingForm.controls.availableStatus.value;
    this.settingsService.addAssetStatus(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.AssetSettingForm.reset();
  }
  deleteStatus(value) {
    this.message = 'Stauts deleted Successfully';
    this.settingsService.deleteAssetStatus(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
}
