import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { WorkOrder } from '../../shared/workorder.model';


@Component({
  selector: 'app-create-monthly-sheet',
  templateUrl: './create-monthly-sheet.component.html',
  styleUrls: ['./create-monthly-sheet.component.css']
})
export class CreateMonthlySheetComponent implements OnInit {
  activityForm: FormGroup;

  activeValue: any;
  activeholder: any;
  ctrlValue: any;
  activityData: any;
  monthToString: any;
  id: string;
  yearValue: any;
  yearToString: any;
  year = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
  unitName: string;
  userRole: any;
  activeData: ActivityLogModel;
  constructor(private fb: FormBuilder, private activityLogService: ActivityLogService,
    private router: Router, private route: ActivatedRoute) { 
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id');
      });
    }

  ngOnInit() {
    this.getAllWorkorder();
    this.createForm();
    this.getUnitName();
  }
  createForm() {
    this.activityForm = this.fb.group({
      workOrderID: [''],
      customerName: [''],
      monthName: [''],
      year: [''],
      title: [''],
      description: [''],
      monthlyPlan:  this.fb.array([]),
      weeklyPlan:  this.fb.array([])
    });
    this.addForm();
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
  onSubmit(activityForm: FormGroup) {
    this.activeData = new ActivityLogModel();
    this.activeData.workOrderID = activityForm.controls.workOrderID.value;
    this.activeData.customerName = activityForm.controls.customerName.value;
    this.activeData.year = activityForm.controls.year.value;
    this.activeData.monthName = activityForm.controls.monthName.value;
    this.activeData.title = activityForm.controls.title.value;
    this.activeData.mobileNumber = this.activeValue.mobileNumber;
    this.activeData.unit = this.userRole;
    this.activeData.description = activityForm.controls.description.value;
    this.activeData.monthlyPlan = activityForm.controls.monthlyPlan.value;
    this.activityLogService.createmonthly(this.activeData).subscribe( data => {
      this.activeValue = data;
      this.router.navigate(['activity-log/viewallmonthly']);
    }, error => {
      console.log(error);
    });
  }
  getAllWorkorder() {
    this.activityLogService.getFindAllWorkorder().subscribe( data => {
      this.activityData = data.filter( value => value._id === this.id);
     this.activeValue = this.activityData[0];
     this.userRole = this.activityData[0].leadUnit;
     console.log(this.activeValue);
    });
  }
  chosenYearHandler(event) {
    this.yearValue = event.getMonth();
    this.yearToString = this.yearValue.toString();
  }
  cancel() {
    this.router.navigate(['activity-log/viewallactivity']);
  }
  getUnitName() {
    this.unitName = localStorage.getItem('unit');
  }
}
