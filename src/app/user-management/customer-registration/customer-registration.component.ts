
import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from './../user-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CustomerRegister } from './customer-registration.model';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  register: CustomerRegister;
  newRoles: any;
  fullLeadUnit: any;
  constructor(private fb: FormBuilder,
     private router: Router, private userManagementService: UserManagementService,
     private snack: MatSnackBar) { }

  ngOnInit() {
    this.userRegister();
    /* this.getAllRole(); */
   /*  this.viewLeadSettings(); */
  }

 /*  getAllRole() {
    this.userManagementService.permissionRole().subscribe(data => {
      this.newRoles = data;
    }, error => {
      console.log(error);
    });
  } */
 /*  viewLeadSettings() {
    this.userManagementService.leadSource().subscribe(data => {
      this.fullLeadUnit = data[0].leadUnit;
    }, err => {
      console.log(err);
    });
  } */
  userRegister() {
    this.registerForm = this.fb.group({
      _id: [''],
      password: ['', Validators.minLength(3)],
      mobileNumber: ['', Validators.required]
    });
  }
  regSubmit(registerForm: FormGroup) {
    this.register = new CustomerRegister();
    this.register.password = registerForm.controls.password.value;
    this.register.mobileNumber = registerForm.controls.mobileNumber.value;
    this.register.customerName = registerForm.controls.customerName.value;
    this.userManagementService.CustomerRegistration(this.register).subscribe(data => {
      this.snack.open('register successfully', 'OK', { duration: 1000, panelClass: ['blue-snackbar'] });
     /*  this.router.navigate(['./account/login']); */
    }, error => {
      console.log(error);
    });
  }
}
