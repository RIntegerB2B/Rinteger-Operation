import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetListingService } from './../asset-listing.service';
import { Expense } from '../../shared/expense.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.css']
})
export class ViewSingleComponent implements OnInit {
  AssetListingForm: FormGroup;
  assetValue: any;
  id: string;

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
      this.assetValue = data;
      console.log(this.assetValue);
    }, error => {
      console.log(error);
    });
  }
  Back() {
    this.router.navigate(['asset/view-all']);
  }
}
