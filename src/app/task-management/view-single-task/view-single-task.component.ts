import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-view-single-task',
  templateUrl: './view-single-task.component.html',
  styleUrls: ['./view-single-task.component.css']
})
export class ViewSingleTaskComponent implements OnInit {
  taskholder: TaskModel[];
  id: string;
  single: string;
  product: FormArray;
  taskDetailsForm: FormGroup;
  unitSort: string;
  roleSort: string;
  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.single = params.get('single');
      }
    );
    this.getSingleTask();
    this.createtask();
    this.getUnit();
  }
  createtask() {
    this.taskDetailsForm = this.fb.group({
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
      comment: [''],
      status: [''],
      toCloseDate: [''],
      toTime: [''],
      closedDate: [''],
      time: [''],
      leaderComment: [''],
      product: this.fb.array([]),
      task: this.fb.array([]),
      shoot: this.fb.array([]),
      list: this.fb.array([])
    });
    this.addForm();
    this.addTaskForm();
    this.addShootForm();
    this.addListForm();
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
    return this.taskDetailsForm.get('product') as FormArray;
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
    return this.taskDetailsForm.get('shoot') as FormArray;
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
    return this.taskDetailsForm.get('list') as FormArray;
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
    return this.taskDetailsForm.get('marketing') as FormArray;
  }

  getSingleTask() {
    this.taskManagementService.getSingleData(this.id).subscribe(data => {
    this.taskholder = data;
    }, error => { console.log(error); 
    });
  }
  updateTask(data) {
    this.router.navigate(['task/edittask', data._id]);
  }
  Back() {
    this.router.navigate(['task/viewtask', this.single]);
  }

  getUnit() {
    this.unitSort =  localStorage.getItem('unit');
    this.roleSort = localStorage.getItem('role');
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
    return this.taskDetailsForm.get('task') as FormArray;
  }

}
