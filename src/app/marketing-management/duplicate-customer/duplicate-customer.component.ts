import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingManagementModel } from '../../shared/marketing-management.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MarketingManagementService } from '../marketing-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialRoutingModule } from 'src/app/material-management/material-management.route';

@Component({
  selector: 'app-duplicate-customer',
  templateUrl: './duplicate-customer.component.html',
  styleUrls: ['./duplicate-customer.component.css']
})
export class DuplicateCustomerComponent implements OnInit {
  MarketingDetailsForm: FormGroup;
  marketingValue: any;
  marektingholder: any;
  id: string;
  marketingEdit = [];
  marketingData: any;
  marketingdelete: any;
  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
     }

  ngOnInit() {
    this.createForm();
    this.getAllcustomer();
  }
  createForm() {
    this.MarketingDetailsForm = this.fb.group({
      title: [''],
      name: [''],
      mobileNumber: [''],
      emailID: [''],
    });
  }
  getAllcustomer() {
    this.marketingManagementService.getSelectedTitle(this.id).subscribe(data => {
      this.marketingData = data;
      this.marektingholder = data.companyDetail;
      this.marketingValue = data.companyDetail;
      for (let i = 0; i <= this.marektingholder.length - 1; i++) {
        for (let j = 0; j <= this.marketingValue.length - 1; j++) {
          if (i !== j && this.marektingholder[i].mobileNumber === this.marketingValue[j].mobileNumber ) {
            this.marketingEdit.push(this.marektingholder[i]);
          }
        }
      }
    }, error => {
      console.log(error);
    });
  }
  deleteList(data) {
    this.marketingManagementService.deleteSelectedlist(data._id).subscribe( value => {
      this.marketingdelete = value;
      this.getAllcustomer();
    }, error => {
      console.log(error);
    });
  }
}
