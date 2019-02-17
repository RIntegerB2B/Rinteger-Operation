import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Customer } from './../../shared/customer.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LeadManagementService } from './../lead-management.service';


@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  mobileNumberList = new FormControl('');
  customerModel: Customer[];
  filteredOptions: Observable<Customer[]>;
  constructor( public dialogRef: MatDialogRef<ExistingCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer, private leadManagementService: LeadManagementService) { }

  ngOnInit() {
    this.getAllCustomer();
  }
  private _filter(value: string): Customer[] {
    const filterValue = value.toString();
    return this.customerModel.filter(option => option.mobileNumber.toString().indexOf(filterValue) === 0);
  }
  selectedCustomer(selected, selectedId)     {
    if (selected.isUserInput === true)       {
      this.customerModel.forEach(function(customer: Customer) {
        console.log(selectedId);
        if (customer._id === selectedId) {
          customer.showDetail = true;
        }       else {
          customer.showDetail = false;
        }
      });
    }
  }
  getAllCustomer() {
    this.leadManagementService.allCustomer().subscribe(data => {
      this.customerModel = data;
      this.filteredOptions = this.mobileNumberList.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }, error => {
      console.log(error);
    });
  }
}
