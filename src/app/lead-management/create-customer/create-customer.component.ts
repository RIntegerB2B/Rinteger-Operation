import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { Customer } from './customer.model';
/* import { mobileNumberValidation } from '../../shared/'; */
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadManagementService } from './../lead-management.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerDetailsForm: FormGroup;
  customerModel: Customer;
  constructor(private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<CreateCustomerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private leadManagementService: LeadManagementService,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }



  createForm() {
    this.customerDetailsForm = this.fb.group({
      customerID: [''],
      mobileNumber: [''],
      altMobileNumber: [''],
      name: ['', Validators.required],
      emailId: ['', [
        Validators.required,
        Validators.email
      ]],
      location: ['', Validators.required],
      /* city: ['', Validators.required], */
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      gstNumber: ['', Validators.required],
      brandName: ['', Validators.required]
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  addSingleCustomer(customerDetailsForm: FormGroup) {
    this.customerModel = new Customer(
      customerDetailsForm.controls.mobileNumber.value,
      customerDetailsForm.controls.altMobileNumber.value,
      customerDetailsForm.controls.name.value,
      customerDetailsForm.controls.emailId.value,
      customerDetailsForm.controls.location.value,
      /* customerDetailsForm.controls.city.value, */
      customerDetailsForm.controls.state.value,
      customerDetailsForm.controls.pincode.value,
      customerDetailsForm.controls.companyName.value,
      customerDetailsForm.controls.companyAddress.value,
      customerDetailsForm.controls.gstNumber.value,
      customerDetailsForm.controls.brandName.value
    );
    this.leadManagementService.addSingleCustomer(this.customerModel).subscribe(data => {
      this.customerModel = data;
      console.log(data.message);
      this.dialogRef.close(true);
    }, error => {
      this.dialogRef.close(false);
      console.log(error);
    });
  }
}
