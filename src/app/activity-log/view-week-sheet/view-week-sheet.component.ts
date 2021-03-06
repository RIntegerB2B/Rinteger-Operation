import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityLogModel } from '../../shared/activity-log.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivityLogService } from '../activity-log.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityMonth } from '../../shared/activity-month.model';
@Component({
  selector: 'app-view-week-sheet',
  templateUrl: './view-week-sheet.component.html',
  styleUrls: ['./view-week-sheet.component.css']
})
export class ViewWeekSheetComponent implements OnInit {
  activityDetailsForm: FormGroup;
  activityModel: any;
  id;
    activityValue: any;
    public pageSize = 50;
    public currentPage = 0;
    public totalSize = 0;
    public array: any;
    private dataSource;
    assignedTo;
  unitName: string;
  activityEdit: any;
  userUnit: any;
  assingId: any;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private activityLogService: ActivityLogService) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        });
    }
    @ViewChild('MatPaginator') paginator: MatPaginator;
  ngOnInit() {
    this.creatForm();
    this.getSelectedWeeklyPlan();
    this.getAssignedTo();
    this.getUnitName();
  }

  creatForm() {
    this.activityDetailsForm = this.fb.group({
      monthData: [''],
      yearData: [''],
      planTitle: [''],
      planDescription: [''],
      week: [''],
      assignedTo: [''],
      weekID: ['']
    });
  }
  getSelectedWeeklyPlan() {
    this.activityLogService.getSelectedWeek(this.id).subscribe( data => {
     this.activityValue = data[0].weeklyPlan;
     console.log(this.activityValue);
     this.userUnit = data[0].unit;
    }, error => {
      console.log(error);
    });
  }
  getAssignedTo() {
    this.activityLogService.getAssignedTo().subscribe( data => {
     /*  if (this.userUnit === 'BSS') {
        this.activityEdit = data.filter( value => value.unit === this.unitName);
        this.assignedTo = this.activityEdit;
       } else if (this.userUnit === 'Technologies') {
         this.activityEdit = data.filter( value => value.unit === this.unitName);
         this.assignedTo = this.activityEdit;
       } */
       this.activityEdit = data.filter( value => value.unit === this.userUnit);
       this.assignedTo = this.activityEdit;
  }, error => {
      console.log(error);
    });
  }
  selectMethod(e, value) {

    this.assingId = this.assignedTo.filter(data => data.userName === e.value);
    console.log(this.assingId);
  }
  assingedsave(ActivityDetailsForm: FormGroup, data) {
    this.activityValue = new ActivityLogModel();
    this.activityValue.assignedTo = data.assignedTo;
    this.activityValue.userId = this.assingId[0]._id;
    this.activityLogService.addAssignValue( this.activityValue, data.weekID).subscribe( value => {
      this.activityValue = value;
      this.router.navigate(['activity-log/createweekly/', data.weekID]);
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
  }
  Delete(row) {
   this.activityLogService.deleteWeeklyPlan(row._id).subscribe( data => {
     this.activityValue = data;
     this.getSelectedWeeklyPlan();
   }, error => {
     console.log(error);
   });
  }
}
