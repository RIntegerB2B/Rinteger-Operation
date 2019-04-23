import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingManagementService } from '../marketing-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { MarketingManagementModel } from 'src/app/shared/marketing-management.model';

@Component({
  selector: 'app-create-marketing-title',
  templateUrl: './create-marketing-title.component.html',
  styleUrls: ['./create-marketing-title.component.css']
})
export class CreateMarketingTitleComponent implements OnInit {
  MarketingManagementForm: FormGroup;
  marketingValue: any;
  location;
  category;
  subCategory;
  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.getSetting();
  }

  createForm() {
    this.MarketingManagementForm = this.fb.group({
      title: [''],
      category: [''],
      subCategory: [''],
      location: ['']
    });
  }
  createTitle(MarketingManagementForm: FormGroup) {
    this.marketingValue = new MarketingManagementModel();
    this.marketingValue.title = MarketingManagementForm.controls.title.value;
    this.marketingValue.category = MarketingManagementForm.controls.category.value;
    this.marketingValue.subCategory = MarketingManagementForm.controls.subCategory.value;
    this.marketingValue.location = MarketingManagementForm.controls.location.value;
    this.marketingManagementService.CreateTitle(this.marketingValue).subscribe( data => {
      this.marketingValue = data;
      this.router.navigate(['marketing/view-all']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['marketing/view-all']);
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


}
