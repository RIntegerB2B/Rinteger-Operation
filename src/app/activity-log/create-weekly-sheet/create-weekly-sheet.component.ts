import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../../shared/task-management.model';
import { from } from 'rxjs';
import { TaskManagementService } from '../../task-management/task-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Register } from '../../user-management/registration/register.model';
/* import { Customer } from './../../customer-management/customer/create-customer/customer.model'; */
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActivityLogService } from '../activity-log.service';

@Component({
  selector: 'app-create-weekly-sheet',
  templateUrl: './create-weekly-sheet.component.html',
  styleUrls: ['./create-weekly-sheet.component.css']
})
export class CreateWeeklySheetComponent implements OnInit {
  department;
  unitName: Register[];
  taskname: any;
  units = ['BSS'];
  priority = ['low', 'medium', 'high', 'critical'];
  taskForm: FormGroup;
  taskholder: TaskModel;
  valueholder: any;
  departmentData;
  assignedBy;
  product: FormArray;
  task: FormArray;
  assignedTo;
  userId;
  weekID;
  unitSort: string;
  photoSort: string;
  productSort: string;
  roleSort: string;
  valueModel: any;
  taskEdit: any;
  workorder: any;
  customer: any;
  uniName: any;
  valueEdit: any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private taskManagementService: TaskManagementService, private activityLogService: ActivityLogService) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.weekID = params.get('id');
        });
     }

  ngOnInit() {
    this.createtask();
    this.getUnit();
    this.getUnitWiseName();
    this.getDepartment();
    this.getValue();
  }
  createtask() {
    this.taskForm = this.fb.group({
      taskNo: [''],
      dateTime: [''],
      taskTitle: [''],
      clientName: [''],
      taskDescription: [''],
      week: [''],
      weekID: [''],
      monthName: [''],
      year: [''],
      priority: [''],
      unit: [''],
      department: [''],
      assignedTo: [''],
      assignedBy: [''],
      status: [''],
      toCloseDate: [''],
      toTime: [''],
      closedDate: [''],
      time: [''],
      list: this.fb.array([]),
      task: this.fb.array([])
    });
    this.addListForm();
    this.addTaskForm();
  }


  addListForm() {
    const list = this.fb.group({
      title: [''],
      listDescription: [''],
      listStatus: ['']
      });
    this.listForms.push(list);
  }

  get listForms() {
    return this.taskForm.get('list') as FormArray;
  }
  deleteList(i) {
    this.listForms.removeAt(i);
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
  changed(e) {
   /*  console.log(this.unitName.filter(data => data.unit === e.value)); */
    this.taskname = this.unitName.filter(data => data.unit === e.value);
  }


  onSubmit(taskForm: FormGroup, unit, assignedTo, clientName, taskTitle, taskDescription, weekID) {
    this.taskholder = new TaskModel();
    this.taskholder.userId = taskForm.controls.assignedTo.value._id;
    this.taskholder.clientName = clientName.value;
    this.taskholder.dateTime = taskForm.controls.dateTime.value;
    this.taskholder.taskTitle = taskTitle.value;
    this.taskholder.taskDescription = taskDescription.value;
    this.taskholder.units = unit.value;
    this.taskholder.priority = taskForm.controls.priority.value;
    this.taskholder.department = taskForm.controls.department.value;
    this.taskholder.assignedTo = assignedTo.value;
    this.taskholder.assignedBy = taskForm.controls.assignedBy.value;
    this.taskholder.status = taskForm.controls.status.value;
    this.taskholder.toCloseDate = taskForm.controls.toCloseDate.value;
    this.taskholder.toTime = taskForm.controls.toTime.value;
    this.taskholder.closedDate = taskForm.controls.closedDate.value;
    this.taskholder.time = taskForm.controls.time.value;
    this.taskholder.weekID = weekID.value;
    this.taskholder.list = taskForm.controls.list.value;
    this.taskManagementService.createBssTask(this.taskholder).subscribe(data => {
      this.taskholder = data;
      this.router.navigate(['activity-log/viewweek/', this.valueEdit._id]);
    }, error => {
      console.log(error);
    });

  }

/*   onSubmit(value) {
   this.taskManagementService.createBssTask(value).subscribe( data => {
     this.valueholder = data;
   }, error => {
     console.log(error);
   });
  } */
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
    });
  }

  getValue() {
    this.activityLogService.getWeekToTask(this.weekID).subscribe(data => {
      this.valueEdit = data;
      this.valueModel = data.weeklyPlan;
    
      this.taskEdit = this.valueModel.filter( value => value.weekID === this.weekID);
      this.valueholder = this.taskEdit[0];
      console.log(this.valueholder);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.router.navigate(['activity-log/viewweek']);
  }
getUnit() {
  this.unitSort =  localStorage.getItem('unit');
  this.roleSort = localStorage.getItem('role');
}

}
