import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { MarketingSetting } from './../../shared/marketing-setting.model';
@Component({
  selector: 'app-marketing-setting',
  templateUrl: './marketing-setting.component.html',
  styleUrls: ['./marketing-setting.component.css']
})
export class MarketingSettingComponent implements OnInit {
  MarketingSettingsForm: FormGroup;
  settingModel: MarketingSetting;
  settingValue: MarketingSetting[];
  showLocation: boolean;
  showCategory: boolean;
  showSubCategory: boolean;
  showContactType: boolean;
  message;
  action;
  constructor(private fb: FormBuilder, private settingsService: SettingsServiceService,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
    this.viewMarketingSetting();
  }
  createForm() {
    this.MarketingSettingsForm = this.fb.group({
      location: [''],
      category: [''],
      subCategory: [''],
      contactType: ['']
    });
  }
  showLocationForm() {
    this.showLocation = true;
    this.showCategory = false;
    this.showSubCategory = false;
    this.showContactType = false;
  }
  showCategoryForm() {
    this.showLocation = false;
    this.showCategory = true;
    this.showSubCategory = false;
    this.showContactType = false;
  }
  showSubCategoryForm() {
    this.showLocation = false;
    this.showCategory = false;
    this.showSubCategory = true;
    this.showContactType = false;
  }
  showContactTypeForm() {
    this.showLocation = false;
    this.showCategory = false;
    this.showSubCategory = false;
    this.showContactType = true;
  }
  addLocation() {
    this.message = 'Location mode added successfully';
    this.settingModel = new MarketingSetting();
    this.settingModel.location = this.MarketingSettingsForm.controls.location.value;
    this.settingsService.addMarketingLocation(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  viewMarketingSetting() {
    this.settingsService.viewMarketingSetting().subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
    }, error => {
      console.log(error);
    })
  }
  deleteLocation(data) {
    this.message = 'Location mode deleted successfully';
    this.settingsService.deleteMarketingLocation(data).subscribe(value => {
      this.settingModel = value;
      this.settingValue = value;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  addCategory() {
    this.message = 'Category Option added successfully';
    this.settingModel = new MarketingSetting();
    this.settingModel.category = this.MarketingSettingsForm.controls.category.value;
    this.settingsService.addMarketingCategory(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  deleteCategory(test) {
    this.message = 'Category option deleted successfully';
    this.settingsService.deleteMarketingCategory(test).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  addSubCategory() {
    this.message = 'Sub Category Option added successfully';
    this.settingModel = new MarketingSetting();
    this.settingModel.subCategory = this.MarketingSettingsForm.controls.subCategory.value;
    this.settingsService.addMarketingSubCategory(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  deleteSubCategory(test) {
    this.message = 'Sub Category option deleted successfully';
    this.settingsService.deleteMarketingSubCategory(test).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  addContactType() {
    this.message = 'Contact Type Option added successfully';
    this.settingModel = new MarketingSetting();
    this.settingModel.contactType = this.MarketingSettingsForm.controls.contactType.value;
    this.settingsService.addMarketingContactType(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  deleteContactType(test) {
    this.message = 'Contact Type option deleted successfully';
    this.settingsService.deleteMarketingContactType(test).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.MarketingSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
}
