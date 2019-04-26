import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserPermission } from './../../shared/userPermission.model';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  accessForm: FormGroup;
  editForm: FormGroup;
  /* seletcForm: FormGroup; */
  editingTrue = false;
  selectedPermissions = [];
  roleValue: UserPermission[];
  roleNameValue;
  roleholder: any ;
  roleData: UserPermission[];
  accessPermission: UserPermission;
  updatePermission: UserPermission;
  constructor(private fb: FormBuilder, private router: Router
    , private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.userAccess();
    this.userAccessEdit();
    this.getRole();
  }
  userAccess() {

    this.accessForm = this.fb.group({
      role: ['', Validators.required],
      currentDate: ['', Validators.required],
      marketingRole: this.fb.group({
        customerNav: [false, Validators.required],
        leadNav: [false, Validators.required],
        bookingNav: [false, Validators.required],
        quotationNav: [false, Validators.required],
        workOrderNav: [false, Validators.required],
        activitylogNav: [false, Validators.required],
        marketingNav: [false, Validators.required]
      }),
      financialRole: this.fb.group({
        incomeNav: [false, Validators.required],
        expenseNav: [false, Validators.required],
        invoiceNav: [false, Validators.required],
        profomaInvoiceNav: [false, Validators.required],
      }),
      baseRole: this.fb.group({
        ticketNav: [false, Validators.required],
        taskNav: [false, Validators.required]
      }),
      adminRole: this.fb.group({
        settingNav: [false, Validators.required],
        uploadNav: [false, Validators.required],
      }),
      materialRole: this.fb.group({
        materialNav: [false, Validators.required],
        assetlistNav: [false, Validators.required],
      }),
      workOrderRole: this.fb.group({
        workOrderMenu: [false, Validators.required],
      })
    });
  }

  userAccessEdit() {

    this.editForm = this.fb.group({
      role: [''],
      currentDate: [''],
      marketingRole: this.fb.group({
        customerNav: [false, Validators.required],
        leadNav: [false, Validators.required],
        bookingNav: [false, Validators.required],
        quotationNav: [false, Validators.required],
        workOrderNav: [false, Validators.required],
        activitylogNav: [false, Validators.required],
        marketingNav: [false, Validators.required]
      }),
      financialRole: this.fb.group({
        incomeNav: [false, Validators.required],
        expenseNav: [false, Validators.required],
        invoiceNav: [false, Validators.required],
        profomaInvoiceNav: [false, Validators.required],
      }),
      baseRole: this.fb.group({
        ticketNav: [false, Validators.required],
        taskNav: [false, Validators.required]
      }),
      adminRole: this.fb.group({
        settingNav: [false, Validators.required],
        uploadNav: [false, Validators.required],
      }),
      materialRole: this.fb.group({
        materialNav: [false, Validators.required],
        assetlistNav: [false, Validators.required],
      }),
      workOrderRole: this.fb.group({
        workOrderMenu: [false, Validators.required],
      })
    });
  }
  sendPermission(accessForm: FormGroup) {
    this.accessPermission = new UserPermission();
    this.accessPermission.role = accessForm.controls.role.value,
      this.accessPermission.currentDate = new Date();
    this.accessPermission.marketingRole = accessForm.controls.marketingRole.value;
    this.accessPermission.financialRole = accessForm.controls.financialRole.value;
    this.accessPermission.baseRole = accessForm.controls.baseRole.value;
    this.accessPermission.adminRole = accessForm.controls.adminRole.value;
    this.accessPermission.materialRole = accessForm.controls.materialRole.value;
    this.accessPermission.workOrderRole = accessForm.controls.workOrderRole.value;
    this.userManagementService.permissionUsers(this.accessPermission).subscribe(data => {
      this.router.navigate(['./user/register']);
    }, error => {
      console.log(error);
    });
  }
  getRole() {
    this.userManagementService.permissionRole().subscribe(data => {
      this.roleValue = data;
      this.roleNameValue = this.roleValue;
      console.log(this.roleNameValue);
    }, error => {
      console.log(error);
    });
  }
  changed(e) {
   console.log(e.value);
   this.editingTrue = true;
    this.roleData = this.roleValue.filter(data => data._id === e.value);
    this.roleholder = this.roleData;
    console.log(this.roleholder);
  }
  updateRole(editForm: FormGroup, value) {
    this.updatePermission = new UserPermission();
    this.updatePermission.marketingRole = editForm.controls.marketingRole.value;
    this.updatePermission.financialRole = editForm.controls.financialRole.value;
    this.updatePermission.baseRole = editForm.controls.baseRole.value;
    this.updatePermission.adminRole = editForm.controls.adminRole.value;
    this.updatePermission.materialRole = editForm.controls.materialRole.value;
    this.updatePermission.workOrderRole = editForm.controls.workOrderRole.value;
    this.userManagementService.updateRole(this.updatePermission, value).subscribe(data => {
      this.roleholder = data;
      this.router.navigate(['./user/register']);
    }, error => {
      console.log(error);
    });
  }
  deleteRole(value) {
    this.userManagementService.DeleteRole(value).subscribe(data => {
      this.roleholder = data;
      this.router.navigate(['./user/register']);
    });
  }
}
