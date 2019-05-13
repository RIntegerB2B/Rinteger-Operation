import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { error } from 'util';

@Component({
  selector: 'app-edit-monthly-plan-sheet',
  templateUrl: './edit-monthly-plan-sheet.component.html',
  styleUrls: ['./edit-monthly-plan-sheet.component.css']
})
export class EditMonthlyPlanSheetComponent implements OnInit {
  activityForm: FormGroup;
  activeValue: any;
  activeholder: any;
  ctrlValue: any;
  activityData: any;
  monthToString: any;
 /*  monthName: string; */
  id: string;
  yearValue: any;
  yearToString: any;
  year = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
  unitName: string;
  userUnit: any;
  constructor(private fb: FormBuilder, private activityLogService: ActivityLogService,
    private router: Router, private route: ActivatedRoute) { this.route.paramMap.subscribe(
    (params: ParamMap) => {
      this.id = params.get('id');
    }); }

  ngOnInit() {
    this.createForm();
    this.getUnitName();
    this.getMonthlyPlan();
  }
  createForm() {
    this.activityForm = this.fb.group({
      workOrderID: [''],
      customerName: [''],
      monthName: [''],
      year: [''],
      mobileNumber: [''],
      title: [''],
      description: [''],
      monthlyPlan:  this.fb.array([]),
      weeklyPlan:  this.fb.array([])
    });

  }
  addForm() {
    const monthlyPlan = this.fb.group({
      monthlyId: [''],
      monthStatus: [''],
      planTitle: [''],
      planDescription: ['']
      });
    this.monthForms.push(monthlyPlan);
  }

  get monthForms() {
    return this.activityForm.get('monthlyPlan') as FormArray;
  }

  deleteList(i) {
    this.monthForms.removeAt(i);
  }
  addNewForm() {
    for (let i = 0; i <= this.activeValue.monthlyPlan.length - 1; i++) {
      const monthlyPlan = this.fb.group({
        planTitle: [this.activeValue.monthlyPlan[i].planTitle],
        planDescription: [this.activeValue.monthlyPlan[i].planDescription]
      });
      this.monthForms.push(monthlyPlan);
    }
  }
  getMonthlyPlan() {
    this.activityLogService.getSelectedMonthlyPlan(this.id).subscribe( data => {
      this.activeValue = data[0];
      this.userUnit = data[0].unit;
      console.log(this.userUnit);
      this.addNewForm();
    }, error => {
      console.log(error);
    });
  }
  updatevalue(activityForm: FormGroup, row) {
    this.activeValue = new ActivityLogModel();
    this.activeValue.workOrderID = activityForm.controls.workOrderID.value;
    this.activeValue.customerName = activityForm.controls.customerName.value;
    this.activeValue.mobileNumber = activityForm.controls.mobileNumber.value;
    this.activeValue.monthName = activityForm.controls.monthName.value;
    this.activeValue.year = activityForm.controls.year.value;
    this.activeValue.title = activityForm.controls.title.value;
    this.activeValue.unit = this.userUnit;
    this.activeValue.description = activityForm.controls.description.value;
    this.activeValue.monthlyPlan = activityForm.controls.monthlyPlan.value;
   this.activityLogService.updateMonthlyPlan(this.activeValue, row._id).subscribe( data => {
     this.activeValue = data;
     this.router.navigate(['activity-log/viewallmonthly']);
   }, error => {
     console.log(error);
   });
  }
  getUnitName() {
    this.unitName = localStorage.getItem('unit');
  }
  cancel() {
    this.router.navigate(['activity-log/viewallmonthly']);
  }
}
