import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegister } from '../customer-registration/customer-registration.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserManagementService } from '../user-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-view-customer-registration',
  templateUrl: './view-customer-registration.component.html',
  styleUrls: ['./view-customer-registration.component.css']
})
export class ViewCustomerRegistrationComponent implements OnInit {

  registeredUserModel;
  userRole: string;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  tempValue: any;
  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getValue();
    this.getRole();
  }
   getValue() {
     this.userManagementService.getAllCustomerRegistration().subscribe(data => {
      this.registeredUserModel = data;
      this.tempValue = data;
      this.registeredUserModel = new MatTableDataSource<any>(data);
      this.registeredUserModel.paginator = this.paginator;
      this.registeredUserModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
     }, err => {
       console.log(err);
     });
  }
  getDelete(data) {
    this.userManagementService.DeleteRegisteredCustomer(data._id).subscribe(value => {
      this.registeredUserModel = data;
      this.tempValue = data;
      this.registeredUserModel = new MatTableDataSource<any>(data);
      this.registeredUserModel.paginator = this.paginator;
      this.registeredUserModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, err => {
      console.log(err);
    });
  }
  getEdit(data) {
    this.router.navigate(['user/editregisteredcustomer/', data._id]);
  }
  getRole() {
    this.userRole = sessionStorage.getItem('role');
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
  filterRegistrationCustomer(data) {
    this.registeredUserModel = new MatTableDataSource<CustomerRegister>(data);
    this.registeredUserModel.paginator = this.paginator;
    this.registeredUserModel = data;

  }
 }
