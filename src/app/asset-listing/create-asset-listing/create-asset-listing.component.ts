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

  // image upload
  fileLength;
  selectRegion: number;
  fileToUpload;
  verifiedBy;
  categories;
  responsePerson;

  urls = new Array<string>();
  localArray: any = [];
  selected: string;
  reader: FileReader = new FileReader();
  imageError: boolean;
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
      categories: [''],
      productPrice: [''],
      purchaseQuantitiy: [''],
      Description: [''],
      availableQuantitiy: ['']
    });
  }

  validateProducts() {
    this.addSingleAsset(this.AssetListingForm);
   /*  if ( this.fileToUpload === undefined ) {
      this.imageError = true;
    } else {
      this.addSingleAsset(this.AssetListingForm);
    } */
  }

  addSingleAsset(AssetListingForm: FormGroup) {
    this.assetValue = new AssetListingModel();
    this.assetValue.date = AssetListingForm.controls.date.value;
    this.assetValue.productName = AssetListingForm.controls.productName.value;
    this.assetValue.responsePerson = AssetListingForm.controls.responsePerson.value;
    this.assetValue.categories = AssetListingForm.controls.categories.value;
    this.assetValue.department = AssetListingForm.controls.department.value;
    this.assetValue.productPrice = AssetListingForm.controls.productPrice.value;
    this.assetValue.purchaseQuantitiy = AssetListingForm.controls.purchaseQuantitiy.value;
    this.assetValue.Description = AssetListingForm.controls.Description.value;
   /*  this.assetValue.availableQuantitiy = AssetListingForm.controls.availableQuantitiy.value; */
    this.assetListingService.createAsset(this.assetValue).subscribe(data => {
      this.assetValue = data;
      this.redirect();
      /* this.uploadImages(data.assetID); */
    }, error => {
      console.log(error);
    });
  }
  getAssetSetting() {
    this.assetListingService.getAssetSetting().subscribe( data => {
      this.department = data[0].department;
      this.responsePerson = data[0].responsePerson;
      this.verifiedBy = data[0].verifiedBy;
      this.categories = data[0].categories;
    }, error => {
      console.log(error);
    } );
  }

  // image upload

  handleFileInput(images: any) {
    this.imageError = false;
    this.fileToUpload = images;
    this.urls = [];
    const files = images;
    if (files) {
      for (const file of files) {
        this.reader = new FileReader();
        this.reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        this.reader.readAsDataURL(file);
      }
    }
  }
  uploadImages(assetId) {
    const formData: any = new FormData();
    this.fileLength = this.fileToUpload.length;
    for (let i = 0; i <= this.fileLength; i++) {
      formData.append('uploads[]', this.fileToUpload[i]);
    }
    this.assetListingService.uploadImages(formData, assetId).subscribe(data => {
    }, error => {
      console.log(error);
    });
    this.redirect();
  }
  cancel() {
    this.router.navigate(['asset/view-all']);
  }
  redirect() {
    this.router.navigate(['asset/view-all']);
  }
}
