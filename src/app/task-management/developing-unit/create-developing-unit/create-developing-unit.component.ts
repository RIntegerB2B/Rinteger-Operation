import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../shared/task-management.model';
import { TaskManagementService } from './../../task-management.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from '../../../shared-module/shared.service';

@Component({
  selector: 'app-create-developing-unit',
  templateUrl: './create-developing-unit.component.html',
  styleUrls: ['./create-developing-unit.component.css']
})
export class CreateDevelopingUnitComponent implements OnInit {
 /*  units = ['Studio', 'BSS', 'Technologies', 'Marketing', 'Operation']; */
  priority = ['low', 'medium', 'high', 'critical'];
  taskForm: FormGroup;
  taskholder: TaskModel;
  department: TaskModel;
  departmentData: any;
  assignedBy: any;
  unitName: any;
  taskname: any;

  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private sharedService: SharedService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createtask();
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
      priority: [''],
      units: [''],
      department: [''],
      assignedTo: [''],
      assignedBy: [''],
      status: [''],
      toCloseDate: [''],
      toTime: [''],
      closedDate: [''],
      time: [''],
      task: this.fb.array([])
    });
    this.addTaskForm();
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

  onSubmit(taskForm: FormGroup) {
    this.taskholder = new TaskModel();
    this.taskholder.userId = taskForm.controls.assignedTo.value._id;
    this.taskholder.clientName = taskForm.controls.clientName.value;
    this.taskholder.dateTime = taskForm.controls.dateTime.value;
    this.taskholder.taskTitle = taskForm.controls.taskTitle.value;
    this.taskholder.taskDescription = taskForm.controls.taskDescription.value;
    this.taskholder.units = 'Technologies';
    this.taskholder.priority = taskForm.controls.priority.value;
    this.taskholder.department = taskForm.controls.department.value;
    this.taskholder.assignedTo = taskForm.controls.assignedTo.value.userName;
    this.taskholder.assignedBy = taskForm.controls.assignedBy.value;
    /* this.taskholder.status = taskForm.controls.status.value; */
    this.taskholder.toCloseDate = taskForm.controls.toCloseDate.value;
    this.taskholder.toTime = taskForm.controls.toTime.value;
    /* this.taskholder.role = this.roleSort; */
    /* this.taskholder.closedDate = taskForm.controls.closedDate.value; */
   /*  this.taskholder.time = taskForm.controls.time.value; */
    this.taskholder.task = taskForm.controls.task.value;
    this.taskManagementService.createTaskForDevelopting(this.taskholder).subscribe(data => {
      this.taskholder = data;
      this.router.navigate(['task/view-developing']);
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
    });
  }
  /* changed(e) {
    this.taskname = this.unitName.filter(data => data.unit === e.value);
  } */
  cancel() {
    this.router.navigate(['task/view-developing']);
  }
}
