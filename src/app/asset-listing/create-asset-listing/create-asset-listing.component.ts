import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { AssetListingModel } from '../../shared/asset-listing.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AssetListingService } from './../asset-listing.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-asset-listing',
  templateUrl: './create-asset-listing.component.html',
  styleUrls: ['./create-asset-listing.component.css']
})
export class CreateAssetListingComponent implements OnInit {
  AssetListingForm: FormGroup;
  assetValue: any;
  department;
  constructor(private assetListingService: AssetListingService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.getAssetSetting();
  }
  createForm() {
    this.AssetListingForm = this.fb.group({
      date: [''],
      productName: [''],
      responsePerson: [''],
      verifiedBy: [''],
      department: [''],
      productPrice: [''],
      purchaseQuantitiy: [''],
      Description: [''],
      availableQuantitiy: ['']
    });
  }



  addSingleAsset(AssetListingForm: FormGroup) {
    this.assetValue = new AssetListingModel();
    this.assetValue.date = AssetListingForm.controls.date.value;
    this.assetValue.productName = AssetListingForm.controls.productName.value;
    this.assetValue.responsePerson = AssetListingForm.controls.responsePerson.value;
    this.assetValue.verifiedBy = AssetListingForm.controls.verifiedBy.value;
    this.assetValue.department = AssetListingForm.controls.department.value;
    this.assetValue.productPrice = AssetListingForm.controls.productPrice.value;
    this.assetValue.purchaseQuantitiy = AssetListingForm.controls.purchaseQuantitiy.value;
    this.assetValue.Description = AssetListingForm.controls.Description.value;
   /*  this.assetValue.availableQuantitiy = AssetListingForm.controls.availableQuantitiy.value; */
    this.assetListingService.createAsset(this.assetValue).subscribe(data => {
      this.assetValue = data;
      this.router.navigate(['asset/view-all']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['asset/view-all']);
  }
  getAssetSetting() {
    this.assetListingService.getAssetSetting().subscribe( data => {
      this.department = data[0].department;
    }, error => {
      console.log(error);
    } );
  }
}
