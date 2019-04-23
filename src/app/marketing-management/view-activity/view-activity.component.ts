import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingManagementModel } from '../../shared/marketing-management.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketingManagementService } from '../marketing-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialRoutingModule } from 'src/app/material-management/material-management.route';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {
  MarketingDetailsForm: FormGroup;
  marketingValue: any;
  id: string;
  marketingEdit: any;
  marketingholder: any;

  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.createForm();
    this.getSelectedCompany();
  }

  createForm() {
    this.MarketingDetailsForm = this.fb.group({
      assingedTo: [''],
      date: [''],
      contactType: [''],
      comment: [''],
    });
  }

  getSelectedCompany() {
    this.marketingManagementService.getSelectedCompany(this.id).subscribe( data => {
     this.marketingValue = data.companyDetail;
     this.marketingholder = this.marketingValue.filter( value => value._id === this.id);
     this.marketingEdit = this.marketingholder[0].activity;
      console.log(this.marketingEdit);
    }, error => {
      console.log(error);
    });
  }
  delete(data) {
    this.marketingManagementService.deleteSelectedActivity(data._id).subscribe( value => {
      this.marketingValue = value;
    }, error => {
      console.log(error);
    });
  }
}
