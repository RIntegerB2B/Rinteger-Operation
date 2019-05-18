import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegister } from '../customer-registration/customer-registration.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchType = ['Name', 'MobileNumber'];
  RegistrationDetailsForm: FormGroup;
  @Input() registeredUserModel: CustomerRegister;
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
          if (!data.customerName) {
            data.customerName = '';
          }
        });
        const filterData = customerData.filter(data => data.customerName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
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
