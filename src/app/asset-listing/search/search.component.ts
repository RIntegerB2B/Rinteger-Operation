import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetListingModel } from '../../shared/asset-listing.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchType = ['Product Name', 'Response Person'];
  AssetListingForm: FormGroup;
  @Input() assetValue: AssetListingModel;
  @Output() searchTask = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.AssetListingForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchAll(filterData) {
    this.searchTask.emit(filterData);
  }
  searchBy(assetData, selectType, filter) {
    switch (selectType) {
      case 'Product Name': {
        assetData.forEach(data => {
          if (!data.productName) {
            data.productName = '';
          }
        });
        const filterData = assetData.filter(data => data.productName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      }
      case 'Response Person': {
        assetData.forEach(data => {
          if (!data.responsePerson) {
            data.responsePerson = '';
          }
        });
        const filterData = assetData.filter(data => data.responsePerson.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      }
    }
  }
}
