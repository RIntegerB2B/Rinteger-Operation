import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './../../shared-module/shared.service';
import { AuthenticationService } from './../../shared-module/auth-service/authentication.service';
import { AccountService } from './../../account/account.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailed = false;
  constructor(public sharedService: SharedService,
     private authenticationService: AuthenticationService, private accountService: AccountService, private fb: FormBuilder,
    private router: Router) {
    this.sharedService.makeMenuTrans();
  }
  onLoginForm: FormGroup;
  login: LogIn;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.onLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginSubmit() {
    this.login = new LogIn();
    this.login.userName = this.onLoginForm.controls.userName.value;
    this.login.password = this.onLoginForm.controls.password.value;
    this.authenticationService.login(this.login.userName, this.login.password)
    .subscribe(data => {
      if (data.length !== 0
      ) {
        sessionStorage.setItem('loginUser', 'true');
        sessionStorage.setItem('menus', JSON.stringify(data[0].userdetails));
        sessionStorage.setItem('role', data[0].role);
        sessionStorage.setItem('unit', data[0].unit);
        sessionStorage.setItem('userId', data[0]._id);
        sessionStorage.setItem('token', data[0].token);
        if (sessionStorage.getItem('role') !== 'admin') {
          this.router.navigate(['./task/viewtask', data[0]._id]);
        } else {
          this.router.navigate(['./lead/leadview']);
        }
      } else {
        this.loginFailed = true;
      }
    }, error => {
      this.loginFailed = true;
      console.log(error);
    });
  }
}
