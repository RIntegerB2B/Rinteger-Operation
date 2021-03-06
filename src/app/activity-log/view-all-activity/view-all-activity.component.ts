import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-view-all-activity',
  templateUrl: './view-all-activity.component.html',
  styleUrls: ['./view-all-activity.component.css']
})
export class ViewAllActivityComponent implements OnInit {

  ActivityDetailsForm: FormGroup;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  activityValue: any;
  activityModel: any;
  @ViewChild('MatPaginator') paginator: MatPaginator;
  unitName: any;
  userRole: string;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private activityLogService: ActivityLogService) { }

  ngOnInit() {
    this.getAllWorkorder();
    this.createForm();
    this.getUnitName();
  }

  createForm() {
    this.ActivityDetailsForm = this.fb.group({
      customerName: [''],
      date: [''],
      companyName: ['']
    });
  }
  getAllWorkorder() {
    this.activityLogService.getFindAllWorkorder().subscribe( value => {
      if (this.userRole !== 'admin') {
      this.activityValue = value.filter( data => data.leadUnit === this.unitName);
      this.activityModel = value.filter( data => data.leadUnit === this.unitName);
    } else {
      this.activityValue = value.filter( data => (data.leadUnit === 'BSS' ) || (data.leadUnit === 'Technologies'));
      this.activityModel = value.filter( data => (data.leadUnit === 'BSS' ) || (data.leadUnit === 'Technologies'));
    }
      this.activityValue = new MatTableDataSource<any>( this.activityModel);
      this.activityValue.paginator = this.paginator;
      this.array =  this.activityModel;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  createMonthlyPlan(data) {
    this.router.navigate(['activity-log/createmonthly/', data._id]);
  }
  getMonthlyPlan() {
    this.router.navigate(['activity-log/viewallmonthly']);
  }
  getWeeklyPlan() {
    this.router.navigate(['activity-log/viewweek']);
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
    this.unitName = sessionStorage.getItem('unit');
    this.userRole = sessionStorage.getItem('role');
  }
  ViewWorkorder(row) {
    this.router.navigate(['activity-log/viewworkorderforactivitylog/', row._id]);
  }
}
