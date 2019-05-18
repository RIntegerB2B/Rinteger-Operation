import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../registration/register.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchType = ['Name', 'MobileNumber'];
  RegistrationDetailsForm: FormGroup;
  @Input() registeredUserModel: Register;
  @Output() searchCustomer = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.RegistrationDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchAll(filterData) {
    this.searchCustomer.emit(filterData);
  }
  searchBy(customerData, selectType, filter) {
    switch (selectType) {
      case 'Name': {
        customerData.forEach(data => {
          if (!data.userName) {
            data.userName = '';
          }
        });
        const filterData = customerData.filter(data => data.userName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchCustomer.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        customerData.forEach(data => {
          if (!data.mobileNumber) {
            data.mobileNumber = '';
          }
        });
        const filterData = customerData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
        this.searchCustomer.emit(filterData);
        break;
      }
    }
  }
}
