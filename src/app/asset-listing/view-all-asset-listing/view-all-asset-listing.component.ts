import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetListingService } from './../asset-listing.service';
import { AssetListingModel } from '../../shared/asset-listing.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { error } from '@angular/compiler/src/util';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-view-all-asset-listing',
  templateUrl: './view-all-asset-listing.component.html',
  styleUrls: ['./view-all-asset-listing.component.css']
})
export class ViewAllAssetListingComponent implements OnInit {
  AssetListingForm: FormGroup;
  assetValue: any;
  assetModel: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;

  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);

  constructor(private assetListingService: AssetListingService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createAsset();
    this.getAllAssetList();
  }
  createAsset() {
    this.AssetListingForm = this.fb.group({
      date: [''],
      productName: [''],
      responsePerson: [''],
      department: [''],
      availableStatus: [''],
      availableQuantitiy: ['']
    });
  }

  addAssetListing() {
    this.router.navigate(['asset/create-asset-list']);
  }
  getAllAssetList() {
    this.assetListingService.getAllAssetList().subscribe(data => {
      this.assetValue = data;
      this.assetModel = data;
      this.assetValue = new MatTableDataSource<any>(data);
      this.assetValue.paginator = this.paginator;
      this.assetValue = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.getTotal();
      this.getQuantity();
    }, err => {
      console.log(err);
    });
  }
  getView(data) {
    this.router.navigate(['asset/view-single/', data._id]);
  }
  getEdit(data) {
    this.router.navigate(['asset/edit-asset/', data._id]);
  }
  getDelete(data) {
    this.assetListingService.deleteAsset(data._id).subscribe( value => {
      this.assetValue = value;
      this.assetModel = value;
      this.assetValue = new MatTableDataSource<any>(value);
      this.assetValue.paginator = this.paginator;
      this.assetValue = value;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, err => {
      console.log(err);
    });
  }
  getTotal() {
    let tot = 0;
    for (let i = 0; i <= this.assetValue.length - 1; i++) {
      tot += this.assetValue[i].productPrice;
    }
    return tot;
  }
  getQuantity() {
    let quan = 0;
    for (let i = 0; i <= this.assetValue.length - 1; i++) {
      quan += this.assetValue[i].availableQuantitiy;
    }
    return quan;
  }
  getUpdate(data) {
    this.router.navigate(['asset/update-asset/', data._id]);
  }
  filterAsset(e) {
    this.assetValue = new MatTableDataSource<AssetListingModel>(e);
    this.assetValue.paginator = this.paginator;
    this.assetValue = e;
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.assetValue = part;
  }
}
