import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingManagementModel } from '../../shared/marketing-management.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketingManagementService } from '../marketing-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialRoutingModule } from 'src/app/material-management/material-management.route';
import { error } from 'util';

@Component({
  selector: 'app-view-title-list',
  templateUrl: './view-title-list.component.html',
  styleUrls: ['./view-title-list.component.css']
})
export class ViewTitleListComponent implements OnInit {
  MarketingDetailsForm: FormGroup;
  marketingValue: any;
  marektingholder: any;
  id: string;
  marketingEdit: any;

  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.getSelectedTitle();
    this.createForm();
  }


  createForm() {
    this.MarketingDetailsForm = this.fb.group({
      title: [''],
      name: [''],
      mobileNumber: [''],
      emailID: [''],
    });
  }


 getSelectedTitle() {
   this.marketingManagementService.getSelectedTitle(this.id).subscribe( data => {
     this.marketingEdit = data.companyDetail;
     this.marketingValue = data;
   }, err => {
     console.log(err);
   });
 }

 EditCompanyDetail(data) {
   this.router.navigate(['marketing/editcompanylist/', data._id]);
 }
 viewSingleDoc(data) {
  this.router.navigate(['marketing/viewsingle/', data._id]);
 }

 updateStatus(data) {
  this.router.navigate(['marketing/updatestatus/', data._id]);
 }
 vewActivityLog(data) {
  this.router.navigate(['marketing/viewactivity/', data._id]);
 }
 deleteList(data) {
   this.marketingManagementService.deleteSelectedlist(data._id).subscribe( value => {
     this.marektingholder = value;
     this.getSelectedTitle();
   }, err => {
     console.log(err);
   });
 }
}
