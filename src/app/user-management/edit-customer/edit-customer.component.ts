import { Component, OnInit, Inject } from '@angular/core';
import { CustomerRegister } from '../customer-registration/customer-registration.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  EditRegisteredCustomerForm: FormGroup;
  registeredCustomerValue;
  id;

  constructor(private userManagementService: UserManagementService, private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.createForm();
    this.getSelectedCustomer();
  }
  createForm() {
    this.EditRegisteredCustomerForm = this.fb.group({
      customerName: [''],
      mobileNumber: [''],
      password: ['']
    });
  }
  getSelectedCustomer() {
    this.userManagementService.SelectedRegisteredCustomer(this.id).subscribe( data => {
       this.registeredCustomerValue = data;
    }, err => {
      console.log(err);
    });
  }
  updateRegisteredCustomer(data) {
    this.userManagementService.updateRegisteredCustomer(data).subscribe(value => {
      this.registeredCustomerValue = data;
      this.router.navigate(['user/viewcustomerregistration']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['user/viewcustomerregistration']);
  }
}
