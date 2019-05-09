import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Key } from 'protractor';
import { NavheaderService } from '../../shared/navheader/navheader.service';

@Component({
  selector: 'app-main-model',
  templateUrl: './main-model.component.html',
  styleUrls: ['./main-model.component.css']
})
export class MainModelComponent implements OnInit {
  userUnit: string;

  constructor() { }

  ngOnInit() {
    this.getUnit();
  }
getUnit() {
  this.userUnit = localStorage.getItem('unit');
}
}
