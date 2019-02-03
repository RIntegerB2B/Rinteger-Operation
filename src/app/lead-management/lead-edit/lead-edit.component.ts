import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent implements OnInit {
  leadDetailsForm: FormGroup;
  leadModel: Lead;
  fullLeadSource;
  fullLeadStatus;
  fullLeadService;
  constructor(private fb: FormBuilder, private leadManagementService: LeadManagementService
    , public dialogRef: MatDialogRef<LeadEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log('single Lead', data.details);
    this.leadModel = data;
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
      mobileNumber: [''],
      name: [''],
      leadOwner: [''],
      leadSource: [''],
      leadStatus: [''],
      service: [''],
      date: [''],
      remarks: [''],
      requirements: this.fb.array([]),
      followUp: this.fb.array([])
    });
    this.addForm();
    this.followUpForm();
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
  followUpForm() {
    const followUp = this.fb.group({
      date: [''],
      upcomingDate: [''],
      remarks: [''],
    });
    this.followUpForms.push(followUp);
  }
  get requirementsForms() {
    return this.leadDetailsForm.get('requirements') as FormArray;
  }
  deleteRequirements(i) {
    this.requirementsForms.removeAt(i);
  }
  get followUpForms() {
    return this.leadDetailsForm.get('followUp') as FormArray;
  }
  deleteFollowUp(i) {
    this.followUpForms.removeAt(i);
  }
  updateLeads(leadDetailsForm: FormGroup, id) {
    console.log('test', leadDetailsForm.value);
    this.leadManagementService.editLead(leadDetailsForm.value, id).subscribe(data => {
      this.leadModel = data;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close();
  }
  viewLeadSettings() {
    this.leadManagementService.leadSource().subscribe(data => {
      this.fullLeadSource = data[0].leadSource;
      this.fullLeadService = data[0].service;
      this.fullLeadStatus = data[0].leadStatus;
    }, err => {
      console.log(err);
    });
  }
  deleteRequirement(id) {
    console.log(this.leadModel._id);
    this.leadManagementService.deleteLeadRequirements(this.leadModel._id, id).subscribe(data => {
      this.leadModel = data;
    }, err => {
      console.log(err);
    });
    this.dialogRef.close();
  }
  deleteFollowUps(id) {
    console.log(this.leadModel._id);
    this.leadManagementService.deleteFollowUps(this.leadModel._id, id).subscribe(data => {
      this.leadModel = data;
    }, err => {
      console.log(err);
    });
    this.dialogRef.close();
  }
}

