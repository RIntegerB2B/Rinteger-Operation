
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
  showResponsalbePerson: boolean;
  showVerifiedBy: boolean;
  showCategories: boolean;
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
      availableStatus: [''],
      responsePerson: [''],
      verifiedBy: [''],
      categories: ['']
    });
  }
  showDepartmentForm() {
    this.showDepartment = true;
    this.showStatus = false;
    this.showResponsalbePerson = false;
    this.showVerifiedBy = false;
    this.showCategories = false;
  }
  showStatusForm() {
    this.showDepartment = false;
    this.showStatus = true;
    this.showResponsalbePerson = false;
    this.showVerifiedBy = false;
    this.showCategories = false;
  }
  showResponsalbePersonForm() {
    this.showDepartment = false;
    this.showStatus = false;
    this.showResponsalbePerson = true;
    this.showVerifiedBy = false;
    this.showCategories = false;
  }
  showVerifiedByForm() {
    this.showDepartment = false;
    this.showStatus = false;
    this.showResponsalbePerson = false;
    this.showVerifiedBy = true;
    this.showCategories = false;
  }
  showCategoriesForm() {
    this.showDepartment = false;
    this.showStatus = false;
    this.showResponsalbePerson = false;
    this.showVerifiedBy = false;
    this.showCategories = true;
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



  addResponsePerson() {
    this.message = 'Response Person added Successfully';
    this.settingModel = new AssetListingSettingModel();
    this.settingModel.responsePerson = this.AssetSettingForm.controls.responsePerson.value;
    this.settingsService.addAssetResponsablePerson(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.AssetSettingForm.reset();
  }
  deleteResponsePerson(value) {
    this.message = 'Response Person deleted Successfully';
    this.settingsService.deleteAssetResponsablePerson(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }

  addVerifiedBy() {
    this.message = 'VerfiedBy added Successfully';
    this.settingModel = new AssetListingSettingModel();
    this.settingModel.verifiedBy = this.AssetSettingForm.controls.verifiedBy.value;
    this.settingsService.addAssetVerifiedBy(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.AssetSettingForm.reset();
  }
  deleteVerifiedBy(value) {
    this.message = 'VerifiedBy deleted Successfully';
    this.settingsService.deleteAssetVerifiedBy(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }

  addCategories() {
    this.message = 'Categories added Successfully';
    this.settingModel = new AssetListingSettingModel();
    this.settingModel.categories = this.AssetSettingForm.controls.categories.value;
    this.settingsService.addAssetCategories(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.AssetSettingForm.reset();
  }
  deleteCategories(value) {
    this.message = 'Categories deleted Successfully';
    this.settingsService.deleteAssetCategories(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }

}
