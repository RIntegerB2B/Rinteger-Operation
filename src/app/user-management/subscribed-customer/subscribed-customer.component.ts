import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegister } from '../customer-registration/customer-registration.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserManagementService } from '../user-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-subscribed-customer',
  templateUrl: './subscribed-customer.component.html',
  styleUrls: ['./subscribed-customer.component.css']
})
export class SubscribedCustomerComponent implements OnInit {
  registeredUserModel;
  userRole: string;
  public array: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild('MatPaginator') paginator: MatPaginator;
  tempValue: any;

  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getRole();
  }
  getAllsubscribedCustomer() {
    this.userManagementService.getAllSubscribedCustomer().subscribe(data => {
  this.registeredUserModel = data;
  this.tempValue = data;
  this.registeredUserModel = new MatTableDataSource<any>(data);
  this.registeredUserModel.paginator = this.paginator;
  this.registeredUserModel = data;
  this.array = data;
  this.totalSize = this.array.length;
  this.iterator();
    }, error => {
      console.log(error);
    });
  }
  NotSubscribedCustomer() {
    this.userManagementService.getNonSubscribedCustomer().subscribe(data => {
      this.registeredUserModel = data;
      this.tempValue = data;
      this.registeredUserModel = new MatTableDataSource<any>(data);
      this.registeredUserModel.paginator = this.paginator;
      this.registeredUserModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  getDelete(row) {
    this.userManagementService.DeleteSubscribe(row._id).subscribe(data => {
      this.registeredUserModel = data;
      this.tempValue = data;
    }, error => {
      console.log(error);
    });
  }
  getRole() {
    this.userRole = localStorage.getItem('role');
  }
  filterRegistrationCustomer(data) {
    this.registeredUserModel = new MatTableDataSource<CustomerRegister>(data);
    this.registeredUserModel.paginator = this.paginator;
    this.registeredUserModel = data;
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
    this.registeredUserModel = part;
  }
}
