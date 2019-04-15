import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lead } from './../../shared/lead.model';
@Component({
  selector: 'app-search-lead',
  templateUrl: './search-lead.component.html',
  styleUrls: ['./search-lead.component.css']
})
export class SearchLeadComponent implements OnInit {
  searchType = ['Name', 'MobileNumber',  'EmailId', 'Location'];
  leadDetailsForm: FormGroup;
  @Input() leadModel: Lead;
  @Output() searchLead = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.leadDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchAll(filterData) {
    this.searchLead.emit(filterData);
  }
  searchBy(leadData, selectType, filter) {
    switch (selectType) {
      case 'Name': {
        const filterData = leadData.filter(data => data.name.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchLead.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        leadData.forEach(data => {
          if (!data.mobileNumber) {
            data.mobileNumber = '';
          }
        });
        const filterData = leadData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
        this.searchLead.emit(filterData);
        break;
      }
      case 'EmailId': {
        leadData.forEach(data => {
          if (!data.emailId) {
            data.emailId = '';
          }
        });
        const filterData = leadData.filter(data =>
          data.emailId.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchLead.emit(filterData);
        break;
      }
      case 'City': {
        leadData.forEach(data => {
          if (!data.city) {
            data.city = '';
          }
        });
        const filterData = leadData.filter(data =>
          data.city.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchLead.emit(filterData);
        break;
      }
      case 'Location': {
        leadData.forEach(data => {
          if (!data.location) {
            data.location = '';
          }
        });
        const filterData = leadData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchLead.emit(filterData);
        break;
      }
    }
  }
}
