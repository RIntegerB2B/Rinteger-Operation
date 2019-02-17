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
import { Customer } from './../../shared/customer.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExistingService } from './../existing-customer/existing.service';


@Component({
  selector: 'app-lead-add',
  templateUrl: './lead-add.component.html',
  styleUrls: ['./lead-add.component.css']
})
export class LeadAddComponent implements OnInit {
  leadDetailsForm: FormGroup;
  leadModel: Lead;
  leadSettingsmodel: LeadSettings;
  /* customerModel: Customer[]; */
  exitsCustomerCheck: boolean;
  customerModel: Customer[] = [];
  /* filteredOptions: Observable<string[]>; */
  myControl = new FormControl();
  options: any[];
  selectedCustomerData: any;
  filteredOptions: Observable<Customer[]>;
  requirements: FormArray;
  totalValue;
  mobileNumberList = new FormControl('');
  fullLeadSource;
  fullLeadStatus;
  fullLeadService;
  arryValue: any = [];
  sum = 0;
  constructor(private fb: FormBuilder,
    private leadManagementService: LeadManagementService, private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.viewLeadSettings();
    this.getAllCustomer();
  }


  /* private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.customerModel.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  } */
  selectedCustomer(selectedId: number) {
    this.exitsCustomerCheck = false;
    this.customerModel.forEach(customer => {
      if (customer.mobileNumber === +selectedId) {
        customer.showDetail = true;
        this.exitsCustomerCheck = customer.showDetail;
        console.log(this.exitsCustomerCheck);
      } else {
        customer.showDetail = false;
      }
    });
  }
  getAllCustomer() {
    this.leadManagementService.allCustomer().subscribe(data => {
      this.customerModel = data;
      /* this.filteredOptions = this.mobileNumberList.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      ); */
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.leadDetailsForm = this.fb.group({
      leadID: [''],
      checkMobileNumber: ['', Validators.maxLength(10)],
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
  leadCreate() {
    this.exitsCustomerCheck = false;
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
      this.router.navigate(['lead/leadview']);
    }, error => {
      console.log(error);
    });
  }
  addExistingSingleLead(leadDetailsForm: FormGroup, customer) {
    this.leadModel = new Lead(
      leadDetailsForm.controls.leadID.value,
      customer.mobileNumber,
      customer.name,
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
      this.router.navigate(['lead/leadview']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['lead/leadview']);
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
}
