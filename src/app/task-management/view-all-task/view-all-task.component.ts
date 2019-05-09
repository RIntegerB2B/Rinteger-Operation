import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource, MAT_DATEPICKER_VALUE_ACCESSOR } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Key } from 'protractor';
import { NavheaderService } from '../../shared/navheader/navheader.service';
@Component({
  selector: 'app-view-all-task',
  templateUrl: './view-all-task.component.html',
  styleUrls: ['./view-all-task.component.css']
})
export class ViewAllTaskComponent implements OnInit {
  taskholder: any;
  taskValue: TaskModel;
  taskData: TaskModel[];
  UnitName: any;
  taskRoleName: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  filterUnit;
  count;
  ratingTask: TaskModel;
  all;
  ratingClicked: number;
  itemIdRatingClicked: string;
  userid;
  userRole;
  filterWise;
  deadcount;
  deletevalue;

  studios;
  BSSs;
  technologys;
  units = [{ name: 'Studio', counts: 0 }, { name: 'BSS', counts: 0 }, { name: 'Technologies', counts: 0 },
{ name: 'Marketing', counts: 0}, { name: 'Operation', counts: 0}];
  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);

  status = ['Started', 'In-Progress', 'Completed', 'Onhold', 'Stopped'];
  userId;
  userUnit: any;
  taskModel: MatTableDataSource<any>;
  taskEdit: TaskModel[];
  marketing: any;
  operation: any;
  dateValue: any;

  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private navheaderService: NavheaderService) { }

  ngOnInit() {
     this.getRole();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
    });
   this.LoadMethod();
    this.navheaderService.hideMenuTrans();
    this.navheaderService.menuItems();
  }
  LoadMethod() {
    if (this.userRole === 'admin') {
      this.getAllTask();
    } else if (this.userRole === 'teamleader') {
      if (this.userRole === 'photographer') {
        this.getRoleWise();
      } else {
      this.getUnitWise();
    }
    } else {
      this.CompareUserId();
    }
  }
  filterTask(data) {
    this.taskholder = new MatTableDataSource<TaskModel>(data);
    this.taskholder.paginator = this.paginator;
    this.taskholder = data;
  }
  getAllTask() {
    this.taskManagementService.getAllTaskData().subscribe(data => {
      this.taskholder = data;
      this.taskValue = data;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.all = this.taskholder.length;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => { console.log(error); }
    );
  }
  getRole() {
    this.userRole = localStorage.getItem('role');
  }
  getUnitWiseName() {
    this.taskManagementService.getUnitWiseName().subscribe(data => {
      this.UnitName = data;
    });
  }
  getUnitWise() {
    this.userUnit = localStorage.getItem('unit');
    this.taskManagementService.compareUserUnits(this.userUnit).subscribe(data => {
      this.taskholder = data.filter( value => value.role !== 'photographer');
      this.taskValue = data.filter( value => value.role !== 'photographer');
      this.taskData = data.filter( value => value.role !== 'photographer');
      this.taskholder = new MatTableDataSource<any>(this.taskData);
      this.taskholder.paginator = this.paginator;
      this.taskholder = this.taskData;
      this.all = this.taskholder.length;
      this.filterWise = this.taskholder;
      this.array = this.taskData;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => {
      console.log(error);
    });
  }
  getRoleWise() {
    this.taskManagementService.compareUserRole(this.userRole).subscribe( data => {
      this.taskholder = data;
      this.taskValue = data;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.all = this.taskholder.length;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => {
      console.log(error);
    });
  }
  getunitwiseTask(value) {
    this.taskholder = this.filterWise.filter(data =>
      data.units === value);
  }
  filterWiseTest() {
    this.studios = this.filterWise.filter(data => data.units === 'Studio');
    this.BSSs = this.filterWise.filter(data => data.units === 'BSS');
    this.technologys = this.filterWise.filter(data => data.units === 'Technologies');
    this.marketing = this.filterWise.filter(data => data.units === 'Marketing');
    this.operation = this.filterWise.filter(data => data.units === 'Operation');
    this.units[0].counts = this.studios.length;
    this.units[1].counts = this.BSSs.length;
    this.units[2].counts = this.technologys.length;
    this.units[3].counts = this.marketing.length;
    this.units[4].counts = this.operation.length;
  }
  deadlinedTask() {
    this.taskManagementService.deadlinedTask().subscribe(data => {
      this.taskholder = data;
      this.taskValue = data;
      this.deadcount = this.taskholder.length;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
    }, error => {
      console.log(error);
    });
  }
  delete(value) {
    this.taskManagementService.DeleteTask(value).subscribe(data => {
      this.deletevalue = data;
      this.LoadMethod();
      if (this.userRole !== 'admin') {
        this.taskholder = this.deletevalue.filter( row => this.userUnit === row.units);
      } else {
        this.taskholder = this.deletevalue;
      }
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
    this.taskholder = part;
  }
  CompareUserId() {
    this.taskManagementService.compareUserId(this.userId).subscribe(data => {
      this.taskholder = data;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.all = this.taskholder.length;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => { console.log(error); }
    );
  }
  filterByStatus(row) {
    this.userUnit = localStorage.getItem('unit');
    this.taskholder = new TaskModel();
    this.taskholder.status = row;
    this.taskManagementService.getStatusWise(this.taskholder).subscribe( data => {
      this.taskEdit = data;
      if (this.userRole !== 'admin') {
      this.taskholder = this.taskEdit.filter( value => this.userUnit === value.units);
    } else {
      this.taskholder = this.taskEdit;
    }
    }, error => {
      console.log(error);
    });
  }
  ratingComponentClick(clickObj: any, id): void {
    const data = this.taskholder.find(((i: any) => i.id === clickObj.itemId));
    this.ratingTask = new TaskModel();
    this.ratingTask.rating = clickObj.rating;
    this.taskManagementService.updateRating(clickObj, id).subscribe( row => {
      this.taskEdit = row;
      this.LoadMethod();
    }, error => {
      console.log(error);
    });
    console.log(this.ratingTask, id);
    if (!!data) {
      data.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = data.company;
    }
  }
  /* searchByDate(date1, date2) {
    this.dateValue = new TaskModel();
    this.dateValue.date1 = date1;
    this.dateValue.date2 = date2;
    this.taskManagementService.getDataByDate(this.dateValue).subscribe( data => {
      this.taskholder = data;
    }, error => {
      console.log(error);
    });
  } */
}
