import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetListingService } from './../asset-listing.service';
import { Expense } from '../../shared/expense.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {AppSetting} from '../../config/appSetting';


@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.css']
})
export class ViewSingleComponent implements OnInit {
  AssetListingForm: FormGroup;
  assetValue: any;
  id: string;
  appSetting: string = AppSetting.imageUrl;

  constructor(private assetListingService: AssetListingService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      });
    }

  ngOnInit() {
    this.createAsset();
    this.getSelectedAsset();
  }
  createAsset() {
    this.AssetListingForm = this.fb.group({
      date: [''],
      productName: [''],
      responsePerson: [''],
      department: [''],
      availableStatus: [''],
      verifiedBy: [''],
      productPrice: [''],
      availability:  this.fb.array([])

    });
  }
  getSelectedAsset() {
    this.assetListingService.getSelectedAsset(this.id).subscribe( data => {
        for (let i = 0 ; i <= data.assetImageName.length - 1; i++) {
          data.assetImageName[i] = this.appSetting +  data.assetID + '/' + data.assetImageName[i];
        }
      this.assetValue = data;
      console.log(this.assetValue, 'single asset');
    }, error => {
      console.log(error);
    });
  }
  Back() {
    this.router.navigate(['asset/view-all']);
  }
}
