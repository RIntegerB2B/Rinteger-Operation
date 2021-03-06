import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../../shared/task-management.model';
import { from } from 'rxjs';
import { TaskManagementService } from '../task-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Register } from '../../user-management/registration/register.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-re-edit-task',
  templateUrl: './re-edit-task.component.html',
  styleUrls: ['./re-edit-task.component.css']
})
export class ReEditTaskComponent implements OnInit {
taskholder: TaskModel[];
taskhold: TaskModel;
taskForm: FormGroup;
taskEdit: any;
id;
editview: string;
  department;
  departmentData;
  assignedBy;
  units = ['Studio', 'BSS', 'Technologies', 'Marketing', 'Operation'];
  priority = ['low', 'medium', 'high', 'critical'];
  status = ['Started', 'In-Progress', 'Completed', 'Onhold', 'Stopped'];
  unitName: any;
  taskname: any;
  unitSort: string;
  roleSort: string;
  taskValue: TaskModel;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private taskManagementService: TaskManagementService,
     private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.editview = params.get('editview');
      });
      this.createtask();
      this.getSelectedTask();
      this.getDepartment();
      this.getUnitWiseName();
      this.getUnit();
  }
  getSelectedTask() {
    this.taskManagementService.getSelectedTask(this.id).subscribe(data => {
      this.taskEdit = data;
      this.addNewForm();
      this.addNewTaskForm();
      this.addNewShootForm();
      this.addNewListForm();
      this.addMarketingDataForm();
    }, error => {
      console.log(error);
    });
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
    mobileNumber: [''],
    department: [''],
    assignedTo: [''],
    assignedBy: [''],
    status: [''],
    toCloseDate: [''],
    toTime: [''],
    closedDate: [''],
    comment: [''],
    leaderComment: [''],
    time: [''],
    product: this.fb.array([]),
    task: this.fb.array([]),
    shoot: this.fb.array([]),
    list: this.fb.array([]),
    marketing: this.fb.array([])
    });
  }

  addForm() {
    const product = this.fb.group({
      customerName: [''],
      productName: [''],
      productCount: [''],
      imageCount: ['']
    });
    this.productForms.push(product);
  }
  get productForms() {
    return this.taskForm.get('product') as FormArray;
  }
  deleteProducts(i) {
    this.productForms.removeAt(i);
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
  addNewForm() {
    for (let i = 0; i <= this.taskEdit.product.length - 1; i++) {
      const product = this.fb.group({
        customerName: [this.taskEdit.product[i].customerName],
        productName: [this.taskEdit.product[i].productName],
        productCount: [this.taskEdit.product[i].productCount],
        imageCount: [this.taskEdit.product[i].imageCount]
      });
      this.productForms.push(product);
    }
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
  addShootForm() {
    const shoot = this.fb.group({
      customerName: [''],
      productName: [''],
      productCount: [''],
      shootType: [''],
      modeName: [''],
      shootPurpose:  [''],
      status:  [''],
      approval: [''],
      requirement: ['']
      });
    this.ShootForms.push(shoot);
  }

  get ShootForms() {
    return this.taskForm.get('shoot') as FormArray;
  }
  deleteShoot(i) {
    this.ShootForms.removeAt(i);
  }
  addNewShootForm() {
    for (let i = 0; i <= this.taskEdit.shoot.length - 1; i++) {
      const shoot = this.fb.group({
        customerName: [this.taskEdit.shoot[i].customerName],
        productName: [this.taskEdit.shoot[i].productName],
        productCount: [this.taskEdit.shoot[i].productCount],
        shootType: [this.taskEdit.shoot[i].shootType],
        modeName: [this.taskEdit.shoot[i].modeName],
        shootPurpose:  [this.taskEdit.shoot[i].shootPurpose],
        status:  [this.taskEdit.shoot[i].status],
        approval: [this.taskEdit.shoot[i].approval],
        requirement: [this.taskEdit.shoot[i].requirement]
      });
     /*  console.log(shoot); */
      this.ShootForms.push(shoot);
    }
  }
  addListForm() {
    const list = this.fb.group({
      title: [''],
      listDescription: [''],
      listStatus: [''],
      listCount: [''],
      noOfProductLive: ['']
      });
    this.listForms.push(list);
  }
  get listForms() {
    return this.taskForm.get('list') as FormArray;
  }
  deleteList(i) {
    this.listForms.removeAt(i);
  }
  addNewListForm() {
    for (let i = 0; i <= this.taskEdit.list.length - 1; i++) {
      const list = this.fb.group({
        title: [this.taskEdit.list[i].title],
        listDescription: [this.taskEdit.list[i].listDescription],
        listStatus: [this.taskEdit.list[i].listStatus],
        listCount: [this.taskEdit.list[i].listCount],
        noOfProductLive: [this.taskEdit.list[i].noOfProductLive]

      });
      this.listForms.push(list);
    }
  }


  addMarketingForm() {
    const marketing = this.fb.group({
      title: [''],
      description: [''],
      activityAssignedCount: [''],
      activityCompletedCount: [''],
      leadCount: ['']
      });
    this.MarketingForms.push(marketing);
  }

  get MarketingForms() {
    return this.taskForm.get('marketing') as FormArray;
  }
  deleteMarkeing(i) {
    this.MarketingForms.removeAt(i);
  }


  addMarketingDataForm() {
    for (let i = 0; i <= this.taskEdit.marketing.length - 1; i++) {
      const marketing = this.fb.group({
        title: [this.taskEdit.marketing[i].title],
        description: [this.taskEdit.marketing[i].description],
        activityAssignedCount: [this.taskEdit.marketing[i].activityAssignedCount],
        activityCompletedCount: [this.taskEdit.marketing[i].activityCompletedCount],
        leadCount: [this.taskEdit.marketing[i].leadCount]

      });
      this.MarketingForms.push(marketing);
    }
  }


  updateTask(taskForm: FormGroup, row) {
    this.taskValue = new TaskModel();
    this.taskValue.userId = this.taskForm.controls.assignedTo.value._id;
    this.taskValue.clientName = this.taskForm.controls.clientName.value;
    this.taskValue.mobileNumber = this.taskForm.controls.mobileNumber.value;
    this.taskValue.dateTime = this.taskForm.controls.dateTime.value;
    this.taskValue.taskTitle = this.taskForm.controls.taskTitle.value;
    this.taskValue.taskDescription = this.taskForm.controls.taskDescription.value;
    this.taskValue.units = this.taskForm.controls.units.value;
    this.taskValue.priority = this.taskForm.controls.priority.value;
    this.taskValue.department = this.taskForm.controls.department.value;
    this.taskValue.assignedTo = this.taskForm.controls.assignedTo.value.userName;
    this.taskValue.assignedBy = this.taskForm.controls.assignedBy.value;
    this.taskValue.status = this.taskForm.controls.status.value;
    this.taskValue.toCloseDate = this.taskForm.controls.toCloseDate.value;
    /* this.taskValue.role = this.taskEdit.role; */
    this.taskValue.toTime = this.taskForm.controls.toTime.value;
    this.taskValue.leaderComment = this.taskForm.controls.leaderComment.value;
    this.taskValue.comment = this.taskForm.controls.comment.value;
    this.taskValue.closedDate = this.taskForm.controls.closedDate.value;
    this.taskValue.time = this.taskForm.controls.time.value;
    this.taskValue.product = this.taskForm.controls.product.value;
    this.taskValue.task = this.taskForm.controls.task.value;
    this.taskValue.shoot = this.taskForm.controls.shoot.value;
    this.taskValue.list = this.taskForm.controls.list.value;

  this.taskManagementService.EditTask(this.taskValue, row._id).subscribe(data => {
    this.taskEdit = data;
    this.router.navigate(['task/viewtask', this.editview]);
  }, error => {
    console.log(error);
  });
}
cancel() {
  this.router.navigate(['task/viewtask', this.editview]);
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
    this.taskname = this.unitName.filter( value => value.unit === this.unitSort);
  });
}
changed(e) {
  this.taskname = this.unitName.filter(data => data.unit === e.value);
  console.log(this.taskname);
}
getUnit() {
  this.unitSort =  sessionStorage.getItem('unit');
  this.roleSort = sessionStorage.getItem('role');
}
}
