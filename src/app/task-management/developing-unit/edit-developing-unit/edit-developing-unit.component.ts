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
  selector: 'app-edit-developing-unit',
  templateUrl: './edit-developing-unit.component.html',
  styleUrls: ['./edit-developing-unit.component.css']
})
export class EditDevelopingUnitComponent implements OnInit {
  units = 'Technologies';
  priority = ['low', 'medium', 'high', 'critical'];
  taskForm: FormGroup;
  taskEdit: any;
  id;
  taskholder: any;
  department: any;
  departmentData: any;
  assignedBy: any;
  unitName: any;
  taskname: any;
  assingedTo = [];
  nameValue: any;
  taskValue: TaskModel;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private taskManagementService: TaskManagementService,
    private router: Router) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.id = params.get('id');
        }
      );
     }

  ngOnInit() {
    this.createtask();
    this.getSelectedTask();
    this.getDepartment();
    this.getUnitWiseName();
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
    status: [''],
    toCloseDate: [''],
    toTime: [''],
    closedDate: [''],
    leaderComment: [''],
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
  deleteModule(i) {
    this.moduleForms.removeAt(i);
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
    this.taskManagementService.getSelectedTask(this.id).subscribe(data => {
      this.taskEdit = data;
      this.addNewTaskForm();
    }, error => {
      console.log(error);
    });
  }
  getDepartment() {
    this.taskManagementService.getDepartmentData().subscribe(data => {
      this.taskholder = data;
      this.department = this.taskholder;
      this.departmentData = this.taskholder[0].department;
      this.assignedBy = this.taskholder[0].assignedBy;
    });
  }
  getUnitWiseName() {
    this.taskManagementService.getUnitWiseName().subscribe(data => {
      this.unitName = data;
      this.taskname = this.unitName.filter( value => value.unit === 'Technologies');
      for (let i = 0; i <= this.taskname.length - 1; i++) {
        this.nameValue = this.taskname[i].userName;
        this.assingedTo.push(this.nameValue);
      }
    });
  }
  updateTask(taskForm: FormGroup, row) {
    this.taskValue = new TaskModel();
    this.taskValue.clientName = taskForm.controls.clientName.value;
    /* this.taskEdit.dateTime = this.taskForm.controls.dateTime.value; */
    this.taskValue.taskTitle = taskForm.controls.taskTitle.value;
    this.taskValue.taskDescription = taskForm.controls.taskDescription.value;
    this.taskValue.priority = taskForm.controls.priority.value;
    this.taskValue.department = taskForm.controls.department.value;
    this.taskValue.assignedTo = taskForm.controls.assignedTo.value;
    this.taskValue.assignedBy = taskForm.controls.assignedBy.value;
    this.taskValue.status = taskForm.controls.status.value;
    this.taskValue.toCloseDate = taskForm.controls.toCloseDate.value;
    this.taskValue.toTime = taskForm.controls.toTime.value;
    this.taskValue.closedDate = taskForm.controls.closedDate.value;
    this.taskValue.time = taskForm.controls.time.value;
    this.taskValue.task = taskForm.controls.task.value;
  this.taskManagementService.EditTaskForDeveloping(this.taskValue, row._id).subscribe(data => {
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
