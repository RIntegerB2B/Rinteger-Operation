import { Component, OnInit, Inject } from '@angular/core';
import { Customer } from './customer.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../customer-management.service';
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
    private customerManagementService: CustomerManagementService,
    private route: ActivatedRoute,
    private router: Router
   ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.customerDetailsForm = this.fb.group({
      customerID: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      gstNumber: ['', Validators.required],
      brandName: ['', Validators.required]
    });
  }
  cancel() {
    this.router.navigate(['customers/viewcustomer']);
  }
  addSingleCustomer(customerDetailsForm: FormGroup) {
    this.customerModel = new Customer(
      customerDetailsForm.controls.customerID.value,
      customerDetailsForm.controls.mobileNumber.value,
      customerDetailsForm.controls.name.value,
      customerDetailsForm.controls.emailId.value,
      customerDetailsForm.controls.location.value,
      customerDetailsForm.controls.city.value,
      customerDetailsForm.controls.state.value,
      customerDetailsForm.controls.pincode.value,
      customerDetailsForm.controls.companyName.value,
      customerDetailsForm.controls.companyAddress.value,
      customerDetailsForm.controls.gstNumber.value,
      customerDetailsForm.controls.brandName.value
    );
    this.customerManagementService.addSingleCustomer(this.customerModel).subscribe(data => {
      this.customerModel = data;
    }, error => {
      console.log(error);
    });
  }
}
