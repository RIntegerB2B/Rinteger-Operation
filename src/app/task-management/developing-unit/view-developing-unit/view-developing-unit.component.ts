import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../shared/task-management.model';
import { TaskManagementService } from './../../task-management.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-view-developing-unit',
  templateUrl: './view-developing-unit.component.html',
  styleUrls: ['./view-developing-unit.component.css']
})
export class ViewDevelopingUnitComponent implements OnInit {
  taskValue: any;
  userRole: string;
  userId: string;
  deletevalue: any;

  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRole();
    this.IdentifyByUser();
  }
  IdentifyByUser() {
    if (this.userRole === 'teamleader') {
      this.getAllData();
    } else {
      this.getByUserId();
    }
  }
  getAllData() {
    this.taskManagementService.getDevelopingData().subscribe(data => {
      this.taskValue = data;
    }, error => {
      console.log(error);
    });
  }
  getByUserId() {
    this.taskManagementService.getByUserIDDevelopingData(this.userId).subscribe(data => {
      this.taskValue = data;
    }, error => {
      console.log(error);
    });
  }

  getRole() {
    this.userRole = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
  }

  delete(value) {
    this.taskManagementService.DeleteTask(value).subscribe(data => {
      this.deletevalue = data;
      this.IdentifyByUser();
    });
  }
}
