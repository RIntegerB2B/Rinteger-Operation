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
  monthToString: any;
 /*  monthName: string; */
  id: string;
  yearValue: any;
  yearToString: any;
  year = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
  unitName: string;
  constructor(private fb: FormBuilder, private activityLogService: ActivityLogService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    /* this.addForm(); */
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
    this.activeValue = new ActivityLogModel();
    this.activeValue.workOrderID = activityForm.controls.workOrderID.value;
    this.activeValue.customerName = activityForm.controls.customerName.value;
    this.activeValue.year = activityForm.controls.year.value;
    this.activeValue.monthName = activityForm.controls.monthName.value;
    this.activeValue.title = activityForm.controls.title.value;
    this.activeValue.unit = this.unitName;
    this.activeValue.description = activityForm.controls.description.value;
    this.activeValue.monthlyPlan = activityForm.controls.monthlyPlan.value;
    this.activityLogService.createmonthly(this.activeValue).subscribe( data => {
      this.activeValue = data;
    }, error => {
      console.log(error);
    });
    this.router.navigate(['activity-log/viewallmonthly']);
  }
  getAllWorkorder() {
    this.activityLogService.getFindAllWorkorder().subscribe( data => {
      this.activeValue = data[0];
      for (let i = 0; i <= this.activeValue.length - 1; i++) {
        if (this.id === this.activeValue[i]._id) {
          this.activeValue = this.activeValue;
        }
      }
    });
  }
  chosenYearHandler(event) {
    this.yearValue = event.getMonth();
    this.yearToString = this.yearValue.toString();
    console.log(this.yearToString);
  }
  cancel() {
    this.router.navigate(['activity-log/viewallactivity']);
  }

  getUnitName() {
    this.unitName = localStorage.getItem('unit');
  /*   console.log(this.unitName); */
  }
}
