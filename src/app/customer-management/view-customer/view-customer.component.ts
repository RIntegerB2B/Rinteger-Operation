import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../customer-management.service';
import { Customer } from './../create-customer/customer.model';
import { Router } from '@angular/router';
import { CreateCustomerService } from './../../customer-management/create-customer/create-customer.service';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
  providers: [CreateCustomerService]
})
export class ViewCustomerComponent implements OnInit {
  customerDetailsForm: FormGroup;
  customerModel: Customer;
  constructor(private fb: FormBuilder,
    private customerManagementService:
      CustomerManagementService,
    private dialog: MatDialog, private router: Router, private createCustomerService: CreateCustomerService) { }

  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      customerID: [''],
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
  addCustomer()   {
    this.createCustomerService.openCustomer();
  }
  getDeleteCustomer(customerDetailsForm: FormGroup, row) {
    row.editing = false;
    customerDetailsForm.reset();
    this.customerManagementService.deleteCustomer(row).subscribe(data => {
      this.customerModel = data;
    }, error => {
      console.log(error);
    });
  }
  getEditCustomer(customerDetailsForm: FormGroup, row) {
    this.router.navigate(['customers/editcustomer', row._id]);
  }
  getAllCustomer() {
    this.customerManagementService.allCustomer().subscribe(data => {
      this.customerModel = data;
      console.log('customers', this.customerModel);
    }, error => {
      console.log(error);
    });
  }
  updateCustomer(customerDetailsForm: FormGroup, row) {
    this.customerManagementService.editCustomer(row).subscribe(data => {
      this.customerModel = data;
    }, error => {
      console.log(error);
    });
  }
}
