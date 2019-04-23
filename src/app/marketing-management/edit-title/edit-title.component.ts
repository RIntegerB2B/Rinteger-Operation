import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MarketingManagementService } from '../marketing-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { MarketingManagementModel } from 'src/app/shared/marketing-management.model';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.css']
})
export class EditTitleComponent implements OnInit {
  MarketingManagementForm: FormGroup;
  marketingValue: any;
  marketingEdit: any;
  marketingholder: any;
  marketingId: any;
  id: string;

  location;
  category;
  subCategory;

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
  getSelectedTitle() {
    this.marketingManagementService.getSelectedTitle(this.id).subscribe( data => {
      this.marketingholder = data;
    }, error => {
      console.log(error);
    });
  }
  updateTitle(MarketingManagementForm: FormGroup, data) {
    this.marketingEdit = new MarketingManagementModel();
    this.marketingEdit.title = MarketingManagementForm.controls.title.value;
    this.marketingEdit.category = MarketingManagementForm.controls.category.value;
    this.marketingEdit.subCategory = MarketingManagementForm.controls.subCategory.value;
    this.marketingEdit.location = MarketingManagementForm.controls.location.value;
    this.marketingManagementService.updateTitle(this.marketingEdit, data._id).subscribe( row => {
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
