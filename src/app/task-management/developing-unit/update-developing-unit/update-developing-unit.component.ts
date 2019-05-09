import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../shared/task-management.model';
import { TaskManagementService } from './../../task-management.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Key } from 'protractor';
import { NavheaderService } from '../../../shared/navheader/navheader.service';

@Component({
  selector: 'app-update-developing-unit',
  templateUrl: './update-developing-unit.component.html',
  styleUrls: ['./update-developing-unit.component.css']
})
export class UpdateDevelopingUnitComponent implements OnInit {
  status = ['Started', 'In-Progress', 'Completed', 'Onhold', 'Stopped'];
  taskForm: FormGroup;
  taskEdit: any;
  id;

  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        }
      );
    }

  ngOnInit() {
    this.createtask();
    this.getSelectedTask();
  }
  createtask() {
    this.taskForm = this.fb.group({
    taskNo: [''],
    dateTime: [''],
    taskTitle: [''],
    clientName: [''],
    taskDescription: [''],
    sizeColumn: [''],
    imageDetail: [''],
    priority: [''],
    units: [''],
    department: [''],
    assignedTo: [''],
    assignedBy: [''],
    comment: [''],
    status: [''],
    toCloseDate: [''],
    toTime: [''],
    closedDate: [''],
    time: [''],
    task: this.fb.array([])
    });
  }
  addTaskForm() {
    const task = this.fb.group({
      moduleName: [''],
      moduleDescription: [''],
      moduleStatus: ['']
      });
    this.moduleForms.push(task);
  }
  get moduleForms() {
    return this.taskForm.get('task') as FormArray;
  }
  addNewTaskForm() {
    for (let i = 0; i <= this.taskEdit.task.length - 1; i++) {
      const task = this.fb.group({
        moduleName: [this.taskEdit.task[i].moduleName],
        moduleDescription: [this.taskEdit.task[i].moduleDescription],
        moduleStatus: [this.taskEdit.task[i].moduleStatus]
      });
      this.moduleForms.push(task);
    }
  }
  getSelectedTask() {
    this.taskManagementService.getSelectedTask(this.id).subscribe( data => {
      this.taskEdit = data;
      this.addNewTaskForm();
    }, error => {
      console.log(error);
    });
  }
  updateTask(taskForm, row) {
    this.taskManagementService.UpdateTaskForDeveloping(taskForm.value, row._id).subscribe(data => {
      this.taskEdit = data;
      this.router.navigate(['task/view-developing']);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.router.navigate(['task/view-developing']);
  }
}
