import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityMonth } from '../../shared/activity-month.model';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  activityDetailsForm: FormGroup;
  activityModel: any;
  activityID: any;
  activityValue: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  @ViewChild('MatPaginator') paginator: MatPaginator;
  assignedTo;

  week = ['week1', 'week2', 'week3', 'week4', 'week5'];
  id: string;
  unitName: string;
  activityEdit: any;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private activityLogService: ActivityLogService) {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      });
  }
  ngOnInit() {
    this.creatForm();
    this.getSelectAactivityLog();
    this.getUnitName();
  }

  creatForm() {
    this.activityDetailsForm = this.fb.group({
      title: [''],
      description: [''],
      week: [''],
      monthStatus: ['']
    });
  }

  getSelectAactivityLog() {
    this.activityLogService.getSelectedActivityLog(this.id).subscribe(data => {
      this.activityModel = data;
      this.activityID = data;
      this.activityValue = this.activityModel[0].monthlyPlan;
      this.activityEdit = this.activityModel[0].monthlyPlan;
      this.activityValue = new MatTableDataSource<any>(this.activityEdit );
     this.array = this.activityEdit ;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  copyToWeeklyPlan(activityDetailsForm: FormGroup, row) {
    this.activityModel = new ActivityLogModel();
    this.activityModel.week = row.week;
    this.activityLogService.copyMonthlyToWeek(this.activityModel, row._id).subscribe(data => {
      this.activityValue = data;
      this.getSelectAactivityLog();
    }, error => {
      console.log(error);
    });
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
  getUnitName() {
    this.unitName = localStorage.getItem('unit');
  }
  goToWeeklyPlan() {
    this.router.navigate(['activity-log/viewweek', this.activityID[0]._id]);
  }
  delete(data) {
    this.activityLogService.deleteMonthlyPlanList(data._id).subscribe( value => {
      this.activityValue = data;
      this.getSelectAactivityLog();
    }, error => {
      console.log( error );
    });
  }
}
