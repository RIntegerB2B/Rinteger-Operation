import { Component, OnInit } from '@angular/core';
import { TaskManagementService } from './../../task-management.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-view-single-developing-unit',
  templateUrl: './view-single-developing-unit.component.html',
  styleUrls: ['./view-single-developing-unit.component.css']
})
export class ViewSingleDevelopingUnitComponent implements OnInit {
  taskDetailsForm: FormGroup;
  taskholder: any;
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
    this.getSingleTask();
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
      task: this.fb.array([]),
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
    return this.taskDetailsForm.get('task') as FormArray;
  }
  getSingleTask() {
    this.taskManagementService.getSingleData(this.id).subscribe(data => {
    this.taskholder = data;
    }, error => {
      console.log(error);
    });
  }

Back() {
  this.router.navigate(['task/view-developing']);
}
}
