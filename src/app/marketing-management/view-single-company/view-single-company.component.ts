import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingManagementModel } from '../../shared/marketing-management.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketingManagementService } from '../marketing-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-single-company',
  templateUrl: './view-single-company.component.html',
  styleUrls: ['./view-single-company.component.css']
})
export class ViewSingleCompanyComponent implements OnInit {
  MarketingDetailsForm: FormGroup;
  marketingholder: any;
  marketingValue: any;
  marketingID: any;
  id: string;

  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { 
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.getSelectedCompany();
    this.createForm();
  }
  createForm() {
    this.MarketingDetailsForm = this.fb.group({
      name: [''],
      mobileNumber: [''],
      emailID: [''],
      address: [''],
      remark: [''],
      status: ['']
    });
  }
  getSelectedCompany() {
    this.marketingManagementService.getSelectedCompany(this.id).subscribe( data => {
      this.marketingID = data;
      this.marketingValue = data.companyDetail;
      this.marketingholder = this.marketingValue.filter( value => value._id === this.id);
    }, error => {
      console.log(error);
    });
  }
  Back() {
    this.router.navigate(['marketing/viewtitlelist/', this.marketingID._id]);
  }

}
