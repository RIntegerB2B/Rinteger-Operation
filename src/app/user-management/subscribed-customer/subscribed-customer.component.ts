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

  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getRole();

  }
  getAllsubscribedCustomer() {
    this.userManagementService.getAllSubscribedCustomer().subscribe(data => {
  this.registeredUserModel = data;
    }, error => {
      console.log(error);
    });
  }
  NotSubscribedCustomer() {
    this.userManagementService.getNonSubscribedCustomer().subscribe(data => {
      this.registeredUserModel = data;
    }, error => {
      console.log(error);
    });
  }
  getDelete(row) {
    this.userManagementService.DeleteSubscribe(row._id).subscribe(data => {
      this.registeredUserModel = data;
    }, error => {
      console.log(error);
    });
  }
  getRole() {
    this.userRole = localStorage.getItem('role');
  }
}
