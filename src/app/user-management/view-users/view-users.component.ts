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
    this.getAllRegisteredUser();
  }
  getAllRegisteredUser() {
    this.userManagementService.allRegister().subscribe(data => {
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
  getDelete(data) {
    this.userManagementService.DeleteRegisteredUser(data._id).subscribe(value => {
      this.registeredUserModel = value;
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
  getEdit(data) {
    this.router.navigate(['user/editregistereduser', data._id]);
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
    this.registeredUserModel = new MatTableDataSource<Register>(data);
    this.registeredUserModel.paginator = this.paginator;
    this.registeredUserModel = data;

  }
}
