import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingManagementModel } from '../../shared/marketing-management.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketingManagementService } from '../marketing-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-all-marketing',
  templateUrl: './view-all-marketing.component.html',
  styleUrls: ['./view-all-marketing.component.css']
})
export class ViewAllMarketingComponent implements OnInit {
  Mar: any;
  MarketingDetailsForm: FormGroup;
  marketingValue: any;
  marketingEdit: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  location;
  category;
  subCategory;
  marketingModel: any;
  @ViewChild('MatPaginator') paginator: MatPaginator;


  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   /*  this.Mar = this.route.snapshot.data['marketing']; */
    this.getMarketingDB();
    this.createForm();
    this.getSetting();
  }

  createForm() {
    this.MarketingDetailsForm = this.fb.group({
      location: [''],
      title: [''],
      category: [''],
      subCategory: ['']
    });
  }
  getMarketingDB() {
    this.marketingManagementService.getTitle().subscribe( data => {
      this.marketingValue = data;
      this.marketingModel = data;
      this.marketingValue = new MatTableDataSource<any>( this.marketingModel);
      this.marketingValue.paginator = this.paginator;
      this.array =  this.marketingModel;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  openTitle(data) {
    this.router.navigate(['marketing/viewtitlelist/', data._id]);
  }
  onLocationChange(e) {
    this.marketingEdit = new MarketingManagementModel();
    this.marketingEdit.location = e.value;
   this.marketingManagementService.findByLocation(this.marketingEdit).subscribe( data => {
     this.marketingValue = data;
   }, error => {
     console.log(error);
   });
  }
  onCategoryChange(e) {
    this.marketingEdit = new MarketingManagementModel();
    this.marketingEdit.category = e.value;
   this.marketingManagementService.findByCategory(this.marketingEdit).subscribe( data => {
     this.marketingValue = data;
   }, error => {
     console.log(error);
   });
  }
  onSubCategoryChange(e) {
    this.marketingEdit = new MarketingManagementModel();
    this.marketingEdit.subCategory = e.value;
   this.marketingManagementService.findBySubCategory(this.marketingEdit).subscribe( data => {
     this.marketingValue = data;
   }, error => {
     console.log(error);
   });
  }
  goToUpload() {
    this.router.navigate(['marketing/upload']);
  }
  EditTitle(data) {
    this.router.navigate(['marketing/edittitle', data._id]);
  }
  DeleteTitle(data) {
    this.marketingManagementService.deleteSelectedTitle(data._id).subscribe( value => {
      this.marketingValue = value;
    }, error => {
      console.log(error);
    });
  }

  getSetting() {
    this.marketingManagementService.getSetting().subscribe( data => {
      this.location = data[0].location;
      this.category = data[0].category;
      this.subCategory = data[0].subCategory;
    }, error => {
      console.log(error);
    });
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
    this.marketingValue = part;
  }
}
