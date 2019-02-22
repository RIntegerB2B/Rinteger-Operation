import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../customer-management.service';
import { Customer } from './../create-customer/customer.model';
import { Router } from '@angular/router';
import { CreateCustomerService } from './../../customer-management/create-customer/create-customer.service';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
  providers: [CreateCustomerService]
})
export class ViewCustomerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  customerDetailsForm: FormGroup;
  customerModel: any;
  public pageSize = 50;
public currentPage = 0;
public totalSize = 0;

public array: any;
public displayedColumns = ['', '', '', '', ''];
public dataSource: any;

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
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }
  getEditCustomer(customerDetailsForm: FormGroup, row) {
    this.router.navigate(['customers/editcustomer', row._id]);
  }
  getAllCustomer() {
    this.customerManagementService.allCustomer().subscribe(data => {
      this.customerModel = new MatTableDataSource<Customer>(data);
      this.customerModel.paginator = this.paginator;
      this.customerModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.customerModel = part;
  }
  updateCustomer(customerDetailsForm: FormGroup, row) {
    this.customerManagementService.editCustomer(row).subscribe(data => {
      this.customerModel = data;
    }, error => {
      console.log(error);
    });
  }
}
