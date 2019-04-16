import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityMonth } from '../../shared/activity-month.model';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'app-view-monthly-sheet',
  templateUrl: './view-monthly-sheet.component.html',
  styleUrls: ['./view-monthly-sheet.component.css']
})
export class ViewMonthlySheetComponent implements OnInit {

  ActivityDetailsForm: FormGroup;
activityModel: any;
activityReturn: any;
activityStatus: any;
  activityValue: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  weeks = ['week1', 'week2', 'week3', 'week4'];
  activeValue: ActivityLogModel;
  allMonth = [{ month: 'January', number: 2 }, { month: 'February', number: 3 }, { month: 'March', number: 4 }, 
  { month: 'April', number: 5 }, { month: 'May', number: 6 }, { month: 'June', number: 7 }, 
  { month: 'July', number: 8 }, { month: 'August', number: 9 },
  { month: 'September', number: 10 }, { month: 'October', number: 11 }, { month: 'November', number: 12 }, { month: 'October', number: 1 }
  ];
  allYear = [
    { year: 2018 },
    { year: 2019 },
    { year: 2020 },
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
    { year: 2025 },
    { year: 2026 },
    { year: 2027 },
    { year: 2028 },
  ];
  @ViewChild('MatPaginator') paginator: MatPaginator;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private activityLogService: ActivityLogService) { }

  ngOnInit() {
    this.getAllActivityLog();
    this.createForm();
    /* this.getStatus(); */

  }

  createForm() {
    this.ActivityDetailsForm = this.fb.group({
      monthData: [''],
      yearData: [''],
      planTitle: [''],
      planDescription: [''],
      week: ['']
    });
  }
  getAllActivityLog() {
    this.activityLogService.getAllactivityLog().subscribe( value => {
      this.activityValue = value;
      this.activityValue = new MatTableDataSource<any>(value);
      this.activityValue.paginator = this.paginator;
      this.array = value;
      this.totalSize = this.array.length;
      this.iterator();
      /* this.compareValue(); */
    }, error => {
      console.log(error);
    });
  }
  createWeeklyPlan(data) {
    /* console.log(data); */
    this.router.navigate(['activity-log/createweekly/', data._id]);
  }
 /*  CopyWeeklyPlan( data) {
    console.log(data);
    console.log(this.ActivityDetailsForm.controls.week.value);
    this.activityModel = new ActivityMonth();
    this.activityModel.week = this.ActivityDetailsForm.controls.week.value;
    this.activityLogService.copyMonthlyToWeek(this.activityModel, data._id).subscribe( value => {
      this.activityReturn = value;
    }, error => {
      console.log(error);
    });
    this.router.navigate(['activity-log/viewweek']);
  } */
  /* getStatus() {
    this.activityLogService.getStatus().subscribe( data => {
      this.activityModel = data;
      console.log(this.activityModel);
    }, error => {
      console.log(error);
    });
  } */
  Delete(row) {
    this.activityLogService.deleteMonthlyPlan(row._id).subscribe( data => {
      this.activityValue = data;
    }, error => {
      console.log(error);
    });
  }
  GoToWeeklyPlanSheet() {
    this.router.navigate(['activity-log/viewweek']);
  }
  searchMonth(ActivityDetailsForm: FormGroup) {
    this.activityModel = new ActivityLogModel();
    this.activityModel.monthName = ActivityDetailsForm.controls.monthData.value;
    this.activityModel.year = ActivityDetailsForm.controls.yearData.value;
    this.activityLogService.getMonthAndYearWise(this.activityModel).subscribe( data => {
      this.activityValue = data;
    }, error => {
      console.log(error);
    });
  }
  changed(e) {
   /*  console.log(this.unitName.filter(data => data.unit === e.value)); */
    this.activityValue = this.activityValue.filter(data => data.year === e.value);
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.activityValue = part;
  }

  openList(row) {
    this.router.navigate(['activity-log/viewlist/', row._id]);
  }
}