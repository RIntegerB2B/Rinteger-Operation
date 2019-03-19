import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from './../create-customer/customer.model';
@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {
  searchType = ['MobileNumber', 'Name', 'EmailId', 'City', 'Location'];
  customerDetailsForm: FormGroup;
  @Input() customerModel: Customer;
  @Output() searchCustomer = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchBy(customerData, selectType, filter) {
    switch (selectType) {
      case 'Name': {
        const filterData = customerData.filter(data => data.name.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchCustomer.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        customerData.forEach(data => {
          if (!data.mobileNumber)           {
            data.mobileNumber = '';
          }
        });
        const filterData = customerData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
          this.searchCustomer.emit(filterData);
        break;
      }
      case 'EmailId': {
        customerData.forEach(data => {
          if (!data.emailId)           {
            data.emailId = '';
          }
        });
        const filterData = customerData.filter(data =>
          data.emailId.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchCustomer.emit(filterData);
        break;
      }
      case 'City': {
        customerData.forEach(data => {
          if (!data.city)           {
            data.city = '';
          }
        });
        const filterData = customerData.filter(data =>
          data.city.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchCustomer.emit(filterData);
        break;
      }
      case 'Location': {
        customerData.forEach(data => {
          if (!data.location)           {
            data.location = '';
          }
        });
        const filterData = customerData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchCustomer.emit(filterData);
        break;
      }
    }
  }
}
