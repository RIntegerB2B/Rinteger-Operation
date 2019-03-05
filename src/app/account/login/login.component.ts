import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderService } from './../../shared/navheader/navheader.service';
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
  constructor(public navheaderService: NavheaderService, private accountService: AccountService, private fb: FormBuilder,
    private router: Router) {
      this.navheaderService.makeMenuTrans();
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
    this.login = new LogIn(
      this.onLoginForm.controls.userName.value,
      this.onLoginForm.controls.password.value
    );
    this.accountService.logIn(this.login).subscribe(data => {
      if (data.length !== 0
      ) {
        localStorage.setItem('loginUser', 'true');
        this.router.navigate(['./lead/leadview']);
      } else {
        this.loginFailed  = true;
      }
    });
  }
}
