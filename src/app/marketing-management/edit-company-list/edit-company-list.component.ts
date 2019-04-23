import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MarketingManagementService } from '../marketing-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { MarketingManagementModel } from 'src/app/shared/marketing-management.model';

@Component({
  selector: 'app-edit-company-list',
  templateUrl: './edit-company-list.component.html',
  styleUrls: ['./edit-company-list.component.css']
})
export class EditCompanyListComponent implements OnInit {
  MarketingManagementForm: FormGroup;
  marketingValue: any;
  marketingEdit: any;
  marketingHolder: any;
  marketingId: any;
  id: string;
  status = ['DND', 'No problem'];

  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.createForm();
    this.getSelectedCompanyList();
  }

  createForm() {
    this.MarketingManagementForm = this.fb.group({
   /*    title: [''], */
      companyDetail: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const companyDetail = this.fb.group({
      name: [''],
      mobileNumber: [''],
      emailID: [''],
      address: [''],
      remark: [''],
      status: ['']
      });
    this.companyDetailsForms.push(companyDetail);
  }
  get companyDetailsForms() {
    return this.MarketingManagementForm.get('companyDetail') as FormArray;
  }
  getSelectedCompanyList() {
    this.marketingManagementService.getSelectedCompany(this.id).subscribe( data => {
      this.marketingId = data;
      this.marketingValue = data.companyDetail;
      this.marketingHolder =  this.marketingValue.filter( value => value._id === this.id);
      this.marketingEdit = this.marketingHolder[0];
    }, error => {
      console.log(error);
    });
  }
  updateCompanyDetail(MarketingManagementForm: FormGroup, data) {
    this.marketingHolder = new MarketingManagementModel();
    this.marketingHolder.companyDetail = MarketingManagementForm.controls.companyDetail.value;
    this.marketingManagementService.updateCompanyDetail(this.marketingHolder, data._id).subscribe( value => {
      this.marketingEdit = value;
      this.router.navigate(['marketing/viewtitlelist/', this.marketingId._id]);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['marketing/viewtitlelist/', this.marketingId._id]);
  }
}
