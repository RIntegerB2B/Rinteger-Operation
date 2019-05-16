import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../registration/register.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserManagementService } from '../user-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  RegistredCustomerDetailsForm: FormGroup;
  registeredUserModel;

  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllRegisteredUser();
  }
  getAllRegisteredUser() {
    this.userManagementService.allRegister().subscribe(data => {
      this.registeredUserModel = data;
    }, error => {
      console.log(error);
    });
  }
  getDelete(data) {
    this.userManagementService.DeleteRegisteredUser(data._id).subscribe(value => {
      this.registeredUserModel = value;
    }, error => {
      console.log(error);
    });
  }
  getEdit(data) {
    this.router.navigate(['user/editregistereduser', data._id]);
  }
}
