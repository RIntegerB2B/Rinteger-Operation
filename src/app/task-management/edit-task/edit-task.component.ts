import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Notification } from '../../shared/notification.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskholder: TaskModel[];
  taskEdit: any;
  taskForm: FormGroup;
  id;
  units = ['Studio', 'BSS', 'Technologies', 'Marketing', 'Operation'];
  priority = ['low', 'medium', 'high', 'critical'];
  department = ['studio', 'BSS', 'technology'];
  assignedBy = ['teamleader1', 'teamleader2'];
  assignedTo = ['worker1', 'worker2'];
  status = ['Started', 'In-Progress', 'Completed', 'Onhold', 'Stopped'];
  userId: string;
  userRole: string;
  product: FormArray;
  editview;
  unitSort: string;
  roleSort: string;
  titleMsg: string;
  title: any;
  notificationBody: string;
  notificationModel: Notification;
  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.editview = params.get('editview');
      });
    this.createtask();
    this.getUnit();
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
      mobileNumber: [''],
      toCloseDate: [''],
      toTime: [''],
      closedDate: [''],
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
  addNewShootForm() {
    for (let i = 0; i <= this.taskEdit.shoot.length - 1; i++) {
      const shoot = this.fb.group({
        customerName: [this.taskEdit.shoot[i].customerName],
        productName: [this.taskEdit.shoot[i].productName],
        productCount: [this.taskEdit.shoot[i].productCount],
        shootType: [this.taskEdit.shoot[i].shootType],
        modeName: [this.taskEdit.shoot[i].modeName],
        shootPurpose: [this.taskEdit.shoot[i].shootPurpose],
        status: [this.taskEdit.shoot[i].status],
        approval: [this.taskEdit.shoot[i].approval],
        requirement: [this.taskEdit.shoot[i].requirement]
      });
      this.ShootForms.push(shoot);
    }
  }

  addShootForm() {
    const shoot = this.fb.group({
      customerName: [''],
      productName: [''],
      productCount: [''],
      shootType: [''],
      modeName: [''],
      shootPurpose: [''],
      status: [''],
      approval: [''],
      requirement: ['']
    });
    this.ShootForms.push(shoot);
  }

  get ShootForms() {
    return this.taskForm.get('shoot') as FormArray;
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
  updateTask(taskForm, row) {
    /* console.log(taskForm.value); */
    this.taskManagementService.UpdateTask(taskForm.value, row._id).subscribe(data => {
      this.taskEdit = data;
      this.router.navigate(['task/viewtask/', this.editview]);

    }, error => {
      console.log(error);
    });
  }
  sendNotification(mobNo, title, status) {
    this.title = title;
    this.notificationBody = 'Your Project' + status;
    this.notificationModel = new Notification();
    this.notificationModel.title = this.title;
    this.notificationModel.notificationBody = this.notificationBody;
    this.notificationModel.mobileNumber = mobNo;
    this.taskManagementService.SendPushNotification(this.notificationModel).subscribe(data => {
      this.notificationModel = data;
      this.router.navigate(['task/viewtask/', this.editview]);
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.router.navigate(['task/viewtask/', this.editview]);
  }
  getUnit() {
    this.unitSort = sessionStorage.getItem('unit');
    this.roleSort = sessionStorage.getItem('role');
  }
}
