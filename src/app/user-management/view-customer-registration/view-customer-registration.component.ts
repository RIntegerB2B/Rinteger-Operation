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

  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getValue();
    this.getRole();
  }
   getValue() {
     this.userManagementService.getAllCustomerRegistration().subscribe(data => {
      this.registeredUserModel = data;
     }, err => {
       console.log(err);
     });
  }
  getDelete(data) {
    this.userManagementService.DeleteRegisteredCustomer(data._id).subscribe(value => {
      this.registeredUserModel = value;
    }, err => {
      console.log(err);
    });
  }
  getEdit(data) {
    this.router.navigate(['user/editregisteredcustomer/', data._id]);
  }
  getRole() {
    this.userRole = localStorage.getItem('role');
  }
 }
