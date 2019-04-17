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
    /* this.getAllWeekly();
    this.getAssignedTo(); */
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
      this.activityValue = data[0].monthlyPlan;
      this.activityValue = new MatTableDataSource<any>(data);
      this.activityValue.paginator = this.paginator;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      console.log(this.activityValue);
    }, error => {
      console.log(error);
    });
  }
  copyToWeeklyPlan(activityDetailsForm: FormGroup, row) {
    this.activityModel = new ActivityLogModel();
    this.activityModel.week = row.week;
    this.activityLogService.copyMonthlyToWeek(this.activityModel, row._id).subscribe(data => {
      this.activityValue = data;
    }, error => {
      console.log(error);
    });
  }
  /* copyweekstatus(ActivityDetailsForm: FormGroup, value) {
    this.activityModel = new ActivityLogModel();
    this.activityModel.week = ActivityDetailsForm.controls.week.value;
    this.activityLogService
  } */
  /*  getAllWeekly() {
     this.activityLogService.getFindAllWeekly().subscribe( data => {
       this.activityValue = data;
       this.activityValue = new MatTableDataSource<any>(data);
       this.activityValue.paginator = this.paginator;
       this.array = data;
       this.totalSize = this.array.length;
       this.iterator();
     }, error => {
       console.log(error);
     });
   }
   getAssignedTo() {
     this.activityLogService.getAssignedTo().subscribe( data => {
       this.assignedTo = data;
       console.log(this.assignedTo);
     }, error => {
       console.log(error);
     });
   }
   assingToTask(data) {
     this.router.navigate(['activity-log/createweekly/', data.weekID]);
   }
   assingedsave(ActivityDetailsForm: FormGroup, data) {
     this.activityValue = new ActivityLogModel();
     this.activityValue.weeklyPlan = ActivityDetailsForm.controls.assignedTo.value;
     this.activityLogService.addAssignValue(ActivityDetailsForm.value, data.weekID).subscribe( data => {
       this.activityValue = data;
     }, error => {
       console.log(error);
     });
   }
 
   deleteCompletely(data) {
     this.activityLogService.deleteCompletePlan(data.weekID).subscribe( value => {
       this.activityValue = value;
     }, error => {
       console.log(error);
     });
   }
   deleteWeekly(row) {
     this.activityLogService.deleteWeeklyPlan(row.weekID).subscribe( data => {
       this.activityValue = data;
     }, error => {
       console.log(error);
     });
   }
   goToMonthlySheet() {
     this.router.navigate(['activity-log/viewallmonthly']);
   }*/
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
}
