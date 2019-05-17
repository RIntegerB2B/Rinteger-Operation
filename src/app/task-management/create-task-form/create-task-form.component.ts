import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../../shared/task-management.model';
import { from } from 'rxjs';
import { TaskManagementService } from '../task-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Register } from '../../user-management/registration/register.model';
/* import { Customer } from './../../customer-management/customer/create-customer/customer.model'; */
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.css']
})
export class CreateTaskFormComponent implements OnInit {
  department; /*
  assignedto;
  assignedby; */
  /*  customerdetail; */
  unitName: Register[];
  taskname: any;
  units = ['Studio', 'BSS', 'Technologies', 'Marketing', 'Operation'];
  priority = ['low', 'medium', 'high', 'critical'];
  taskForm: FormGroup;
  taskholder: TaskModel;
  /*   customerModel: Customer; */
  /*   selectedData: Customer; */
  departmentData;
  assignedBy;
  product: FormArray;
  task: FormArray;
  assignedTo;
  userId;
  clientName;
  unitSort: string;
  photoSort: string;
  productSort: string;
  roleSort: string;
  mob: any;
  mobHolder: any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private taskManagementService: TaskManagementService) { }

  ngOnInit() {
    this.createtask();
    this.getUnit();
    this.getUnitWiseName();
    this.getDepartment();
    this.getAllsubscribedCustomer();
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.userId = params.get('id');
      });
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
    this.addForm();
    this.addTaskForm();
    this.addShootForm();
    this.addListForm();
    this.addMarketingForm();
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
  deleteShoot(i) {
    this.ShootForms.removeAt(i);
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
  changed(e) {
    /* console.log(this.unitName.filter(data => data.unit === e.value)); */
    this.taskname = this.unitName.filter(data => data.unit === e.value);
  }
  onSubmit(taskForm: FormGroup, mobe) {
    this.taskholder = new TaskModel();
    /*   this.taskholder.taskNo = this.taskForm.controls.taskNo.value; */
    this.taskholder.userId = this.taskForm.controls.assignedTo.value._id;
    this.taskholder.clientName = this.taskForm.controls.clientName.value.customerName;
    this.taskholder.mobileNumber = mobe.value;
    /*   this.taskholder.dateTime = this.taskForm.controls.dateTime.value; */
    this.taskholder.taskTitle = this.taskForm.controls.taskTitle.value;
    this.taskholder.taskDescription = this.taskForm.controls.taskDescription.value;
    this.taskholder.units = this.taskForm.controls.units.value;
    this.taskholder.priority = this.taskForm.controls.priority.value;
    this.taskholder.department = this.taskForm.controls.department.value;
    this.taskholder.assignedTo = this.taskForm.controls.assignedTo.value.userName;
    this.taskholder.assignedBy = this.taskForm.controls.assignedBy.value;
    this.taskholder.status = this.taskForm.controls.status.value;
    this.taskholder.toCloseDate = this.taskForm.controls.toCloseDate.value;
    this.taskholder.toTime = this.taskForm.controls.toTime.value;
    this.taskholder.role = this.roleSort;
    this.taskholder.closedDate = this.taskForm.controls.closedDate.value;
    this.taskholder.time = this.taskForm.controls.time.value;
    this.taskholder.product = this.taskForm.controls.product.value;
    this.taskholder.task = this.taskForm.controls.task.value;
    this.taskholder.shoot = this.taskForm.controls.shoot.value;
    this.taskholder.list = this.taskForm.controls.list.value;
    this.taskholder.marketing = this.taskForm.controls.marketing.value;
    this.taskManagementService.createTask(this.taskholder).subscribe(data => {
      this.taskholder = data;
      this.router.navigate(['task/viewtask', this.userId]);
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
    });
  }
  cancel() {
    this.router.navigate(['task/viewtask', this.userId]);
  }
  getUnit() {
    this.unitSort = localStorage.getItem('unit');
    this.roleSort = localStorage.getItem('role');
  }
  getAllsubscribedCustomer() {
    this.taskManagementService.getAllSubscribedCustomer().subscribe(data => {
  this.clientName = data;
    }, error => {
      console.log(error);
    });
  }
  changedByClient(e) {
    const temp = e.value;
    this.mob = this.clientName.filter(data => data.mobileNumber === temp.mobileNumber);
    this.mobHolder = this.mob[0].mobileNumber;
  }
}
