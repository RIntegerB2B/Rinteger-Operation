import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from './../../shared/lead.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { LeadManagementService } from './../lead-management.service';
import { CustomerManagementService } from './../../customer-management/customer-management.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SettingsServiceService } from '../../settings-management/settings-service.service';
import { LeadSettings } from '../../shared/lead-settings.model';

@Component({
  selector: 'app-lead-add',
  templateUrl: './lead-add.component.html',
  styleUrls: ['./lead-add.component.css']
})
  export class LeadAddComponent implements OnInit {
    leadDetailsForm: FormGroup;
    leadModel: Lead;
    leadSettingsmodel: LeadSettings;
    requirements: FormArray;
    totalValue;
    fullLeadSource;
    fullLeadStatus;
    fullLeadService;
    arryValue: any = [];
    sum = 0;
    constructor(private fb: FormBuilder, private leadManagementService: LeadManagementService
      , private settingsservice: SettingsServiceService,
      public dialogRef: MatDialogRef<LeadAddComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Lead) {
      console.log(data);
    }
    cancel(): void {
      this.dialogRef.close();
    }
    ngOnInit() {
      this.createForm();
      this.viewLeadSettings();
    }
    createForm() {
      this.leadDetailsForm = this.fb.group({
        leadID: [''],
        mobileNumber: ['', Validators.required],
        name: ['', Validators.required],
        leadOwner: ['', Validators.required],
        leadSource: ['', Validators.required],
        leadStatus: ['', Validators.required],
        service: ['', Validators.required],
        date: ['', Validators.required],
        remarks: [''],
        requirements: this.fb.array([]),
        subTotal: [this.sum],
        allTotal: [this.sum],
        tax: [],
      });
      this.addForm();
    }
    addForm() {
      const requirements = this.fb.group({
        item: [''],
        quantity: [''],
        price: [''],
        discount: [''],
        description: [''],
        total: ['']
      });
      this.requirementsForms.push(requirements);
    }
    getTotal() {
      this.sum = 0;
      this.arryValue = this.leadDetailsForm.controls.requirements;
      this.arryValue.controls.forEach(x => {
        const parsed = +x.get('total').value;
        this.sum += parsed;
        console.log(this.sum);
      });
    }
    get requirementsForms() {
      return this.leadDetailsForm.get('requirements') as FormArray;
    }
    deleteRequirements(i) {
      this.requirementsForms.removeAt(i);
      this.getTotal();
    }
    addSingleLead(leadDetailsForm: FormGroup) {
      this.leadModel = new Lead(
        leadDetailsForm.controls.leadID.value,
        leadDetailsForm.controls.mobileNumber.value,
        leadDetailsForm.controls.name.value,
        leadDetailsForm.controls.leadOwner.value,
        leadDetailsForm.controls.leadSource.value,
        leadDetailsForm.controls.leadStatus.value,
        leadDetailsForm.controls.service.value,
        leadDetailsForm.controls.requirements.value,
        leadDetailsForm.controls.date.value,
        leadDetailsForm.controls.remarks.value,
        leadDetailsForm.controls.allTotal.value,
        leadDetailsForm.controls.subTotal.value,
        leadDetailsForm.controls.tax.value
      );
      this.leadManagementService.addSingleLead(this.leadModel).subscribe(data => {
        this.leadModel = data;
      }, error => {
        console.log(error);
      });
      this.dialogRef.close();
    }
    viewLeadSettings() {
      this.settingsservice.leadSource().subscribe(data => {
        this.fullLeadSource = data[0].leadSource;
        this.fullLeadService = data[0].service;
        this.fullLeadStatus = data[0].leadStatus;
      }, err => {
        console.log(err);
      });
    }
}
