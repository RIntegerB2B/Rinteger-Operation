import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MarketingManagementService } from '../marketing-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { MarketingManagementModel } from 'src/app/shared/marketing-management.model';

@Component({
  selector: 'app-create-title-list',
  templateUrl: './create-title-list.component.html',
  styleUrls: ['./create-title-list.component.css']
})
export class CreateTitleListComponent implements OnInit {
  MarketingManagementForm: FormGroup;
  marketingValue: any;
  marketingEdit: any;
  id: string;

  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
     }

  ngOnInit() {
    this.createForm();
    this.getSelectedTitle();
  }

  createForm() {
    this.MarketingManagementForm = this.fb.group({
      title: [''],
      companyDetail: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const companyDetail = this.fb.group({
      name: [''],
      mobileNumber: [''],
      emailID: [''],
      address: ['']
      });
    this.companyDetailsForms.push(companyDetail);
  }
  get companyDetailsForms() {
    return this.MarketingManagementForm.get('companyDetail') as FormArray;
  }
getSelectedTitle() {
  this.marketingManagementService.getSelectedTitle(this.id).subscribe( data => {
    this.marketingValue = data;
  }, error => {
    console.log(error);
  });
}

createCompanyDetail(MarketingManagementForm: FormGroup, row) {
  this.marketingEdit = new MarketingManagementModel();
  this.marketingEdit.companyDetail = MarketingManagementForm.controls.companyDetail.value;
  this.marketingManagementService.CreateCompanyDetail(this.marketingEdit, row._id).subscribe( data => {
    this.marketingEdit = data;
    this.router.navigate(['marketing/viewtitlelist/', this.marketingValue._id]);
  }, error => {
    console.log(error);
  });
 
}
cancel() {
  this.router.navigate(['marketing/viewtitlelist/', this.marketingValue._id]);
}
}
