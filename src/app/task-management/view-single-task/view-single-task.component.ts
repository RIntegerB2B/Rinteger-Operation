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
  }
  createtask() {
    this.taskDetailsForm = this.fb.group({
     
      taskNo: [''],
      dateTime: [''],
      taskTitle: [''],
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
      product: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const product = this.fb.group({
    productName: [''],
    productCount: [''],
    imageCount: ['']
      });
    this.productForms.push(product);
  }

  get productForms() {
    return this.taskDetailsForm.get('product') as FormArray;
  }

  getSingleTask() {

    this.taskManagementService.getSingleData(this.id).subscribe(data => {
    this.taskholder = data;
      console.log(this.taskholder);
    }, error => { console.log(error); }
    );
  }
  updateTask(data) {
    this.router.navigate(['task/edittask', data._id]);
  }
  Back() {
    this.router.navigate(['task/viewtask', this.single]);
  }

}
