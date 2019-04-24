import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityMonth } from '../../shared/activity-month.model';
import { timingSafeEqual } from 'crypto';
import { error } from 'util';

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
yearValue: any;
  activityValue: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  year = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
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
  unitName: string;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private activityLogService: ActivityLogService) { }

  ngOnInit() {
    this.getAllActivityLog();
    this.createForm();
    this.getUnitName();
  }

  createForm() {
    this.ActivityDetailsForm = this.fb.group({
      monthData: [''],
      yearData: [''],
      customerName: [''],
      planTitle: [''],
      planDescription: [''],
      monthName: [''],
      year: ['']
    });
  }
  getAllActivityLog() {
    this.activityLogService.getAllactivityLog().subscribe( value => {
      this.activityValue = value.filter( data => data.unit === this.unitName);
      this.activityModel = value.filter( data => data.unit === this.unitName);
      this.activityValue = new MatTableDataSource<any>(this.activityModel);
      this.activityValue.paginator = this.paginator;
      this.array = this.activityModel;
      this.totalSize = this.array.length;
      this.iterator();
    }, err => {
      console.log(err);
    });
  }
  createWeeklyPlan(data) {
    this.router.navigate(['activity-log/createweekly/', data._id]);
  }
  Delete(row) {
    this.activityLogService.deleteMonthlyPlan(row._id).subscribe( data => {
      this.activityValue = data;
    }, err => {
      console.log(err);
    });
  }
  GoToWeeklyPlanSheet() {
    this.router.navigate(['activity-log/viewweek']);
  }
  changed(e) {
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
  getUnitName() {
    this.unitName = localStorage.getItem('unit');
  }
  Edit(row) {
    this.router.navigate(['activity-log/editmonthlysheet/', row._id]);
  }
  SearchByYear(e) {
    this.ActivityDetailsForm.controls.monthData.reset();
    this.yearValue = new ActivityLogModel();
    this.yearValue.year = e.value;
    this.activityLogService.getYearWise(this.yearValue).subscribe( data => {
      this.activityValue = data;
      this.yearValue = data;
    }, err => {
      console.log(err);
    });
  }
  filterByMonth(e) {
    this.activityValue = this.yearValue.filter( value => value.monthName === e.value);
  }
}
