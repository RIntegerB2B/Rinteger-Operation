import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { AssetListingModel } from '../../shared/asset-listing.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AssetListingService } from './../asset-listing.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-update-asset-listing',
  templateUrl: './update-asset-listing.component.html',
  styleUrls: ['./update-asset-listing.component.css']
})
export class UpdateAssetListingComponent implements OnInit {
  AssetListingForm: FormGroup;
  assetValue: any;
  department;
  availableStatus;
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
    this.getAssetSetting();
  }
  createAsset() {
    this.AssetListingForm = this.fb.group({
      date: [''],
      productName: [''],
      responsePerson: [''],
      department: [''],
      availableStatus: [''],
      categories: [''],
      verifiedBy: [''],
      productPrice: [''],
      purchaseQuantitiy: [''],
      Description: [''],
      availableQuantitiy: [''],
      availability:  this.fb.array([])
    });

  }

  addForm() {
    const availability = this.fb.group({
      currentQuantity: [''],
      description: ['']
      });
    this.availabilityForm.push(availability);
  }
  get availabilityForm() {
    return this.AssetListingForm.get('availability') as FormArray;
  }
  deleteAsset(i) {
    this.availabilityForm.removeAt(i);
  }


  addNewForm() {
    for (let i = 0; i <= this.assetValue.availability.length - 1; i++) {
      const availability = this.fb.group({
        currentQuantity: [this.assetValue.availability[i].currentQuantity],
        description: [this.assetValue.availability[i].description]
      });
      this.availabilityForm.push(availability);
    }
  }



  getSelectedAsset() {
    this.assetListingService.getSelectedAsset(this.id).subscribe(data => {
      this.assetValue = data;
      this.addNewForm();
    }, err => {
      console.log(err);
    });
  }
  updateAsset(AssetListingForm: FormGroup, data) {
    this.assetValue = new AssetListingModel();
    this.assetValue.date = AssetListingForm.controls.date.value;
    this.assetValue.productName = AssetListingForm.controls.productName.value;
    this.assetValue.responsePerson = AssetListingForm.controls.responsePerson.value;
    this.assetValue.verifiedBy = AssetListingForm.controls.verifiedBy.value;
    this.assetValue.department = AssetListingForm.controls.department.value;
    this.assetValue.categories = AssetListingForm.controls.categories.value;
    this.assetValue.availableStatus = AssetListingForm.controls.availableStatus.value;
    this.assetValue.productPrice = AssetListingForm.controls.productPrice.value;
    this.assetValue.purchaseQuantitiy = AssetListingForm.controls.purchaseQuantitiy.value;
    this.assetValue.Description = AssetListingForm.controls.Description.value;
    this.assetValue.availability = AssetListingForm.controls.availability.value;
    this.assetListingService.updateAsset(this.assetValue, data._id).subscribe( data => {
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
      this.availableStatus = data[0].availableStatus;
    }, error => {
      console.log(error);
    } );
  }
}
