import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MarketingManagementService } from '../marketing-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { MarketingManagementModel } from 'src/app/shared/marketing-management.model';
import { MarketingTitleModel } from '../../shared/marketing-title.model';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  MarketingManagementForm: FormGroup;
  marketingValue: any;
  marketingEdit: any;
  marketingholder: any;
  marketingId: any;
  id: string;
  contactType;
  assingedTo = ['person1', 'person2'];

  constructor(private marketingManagementService: MarketingManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { 
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }

  ngOnInit() {
    this.createForm();
    this.getSelectedCompant();
    this.getSetting();
  }
  createForm() {
    this.MarketingManagementForm = this.fb.group({
      activity: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const activity = this.fb.group({
      date: [''],
      contactType: [''],
      assingedTo: [''],
      comment: ['']
      });
    this.activityDetailsForms.push(activity);
  }
  get activityDetailsForms() {
    return this.MarketingManagementForm.get('activity') as FormArray;
  }
  getSelectedCompant() {
    this.marketingManagementService.getSelectedCompany(this.id).subscribe( data => {
      this.marketingId = data;
      this.marketingValue = data.companyDetail;
      this.marketingEdit = this.marketingValue.filter( value => value._id === this.id);
    }, error => {
      console.log(error);
    });
  }

  CreateStatus(MarketingManagementForm: FormGroup) {
    this.marketingholder = new MarketingTitleModel();
    this.marketingholder.activity = MarketingManagementForm.controls.activity.value;
   /*  console.log(this.marketingholder,this.marketingEdit[0]._id); */
   this.marketingManagementService.addActivity(this.marketingholder, this.marketingEdit[0]._id).subscribe(data => {
     this.marketingEdit = data;
     this.router.navigate(['marketing/viewtitlelist/', this.marketingId._id ]);
   }, error => {
     console.log(error);
   });
  }

  cancel() {
    this.router.navigate(['marketing/viewtitlelist/', this.marketingId._id ]);
  }
  getSetting() {
    this.marketingManagementService.getSetting().subscribe( data => {
     this.contactType = data[0].contactType;
    }, error => {
      console.log(error);
    });
  }


}
