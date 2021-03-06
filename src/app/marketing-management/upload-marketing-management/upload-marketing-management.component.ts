import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MarketingManagementModel } from '../../shared/marketing-management.model';
import { MarketingManagementService } from '../marketing-management.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-upload-marketing-management',
  templateUrl: './upload-marketing-management.component.html',
  styleUrls: ['./upload-marketing-management.component.css']
})
export class UploadMarketingManagementComponent implements OnInit {
bufferValue;
marketingValue: any;
title;
 file: File;
  message: string;
  action: string;
  constructor(private marketingManagementService: MarketingManagementService,
     public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getAllTitle();
  }
  onSubmit(event) {
    this.file = event.target.files[0];
  }
  onChange(val) {
    this.message = 'Upload Successful';
    const reader = new FileReader();
    reader.onload = (e) => {
     this.bufferValue = reader.result;
     const data = new Uint8Array(this.bufferValue);
     const arr = new Array();
      for (let i = 0; i <= data.length - 1; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const space = arr.join('');
      const document = XLSX.read(space, {type: 'binary'});
      const doc = document.SheetNames[0];
      const sheet = document.Sheets[doc];
      this.marketingValue = new MarketingManagementModel();
      this.marketingValue.companyDetail = XLSX.utils.sheet_to_json(sheet, {raw: true});
      this.marketingManagementService.addBulkUpload(this.marketingValue, val._id).subscribe( row => {
        this.marketingValue = data;
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }, error => {
        console.log(error);
      });
    };
    reader.readAsArrayBuffer(this.file);
  }
  getAllTitle() {
    this.marketingManagementService.getTitle().subscribe( data => {
      this.title = data.filter( value => value.title );
    }, error => {
      console.log(error);
    });
  }
}
