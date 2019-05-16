import { Component, OnInit, Inject } from '@angular/core';
import { Register } from '../registration/register.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  EditRegisteredUserForm: FormGroup;
  id: string;
  registeredUserValue: any;
  units = ['Studio', 'BSS', 'Technologies', 'Marketing', 'Operation'];
  roles;

  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.createForm();
    this.getSelectedUserDetail();
    this.getAllRole();
  }
  createForm() {
    this.EditRegisteredUserForm = this.fb.group({
      userName: [''],
      mobileNumber: [''],
      role: [''],
      unit: [''],
      password: ['']
    });
  }
  getSelectedUserDetail() {
    this.userManagementService.SelectedRegisteredUser(this.id).subscribe( data => {
      this.registeredUserValue = data;
    }, error => {
      console.log(error);
    });
  }
getAllRole() {
    this.userManagementService.permissionRole().subscribe(data => {
      this.roles = data;
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['user/viewregistereduser']);
  }
  updateRegisteredUser(row) {
    this.userManagementService.updateRegisteredUser(row).subscribe(data => {
      this.registeredUserValue = data;
      this.router.navigate(['user/viewregistereduser']);
    }, error => {
      console.log(error);
    });
  }
}
