import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
  units = ['studio', 'BSS', 'technology'];
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
  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.editview = params.get('editview');
      });
      this.createtask();
      this.getAllTask();
      this.getUnit();
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
    product: this.fb.array([]),
    task: this.fb.array([]),
    shoot: this.fb.array([]),
    list: this.fb.array([])
    });
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
        modeName: [this.taskEdit.shoot[i].modeName]

      });
      console.log(shoot);
      this.ShootForms.push(shoot);
    }
  }

  addShootForm() {
    const shoot = this.fb.group({
      customerName: [''],
      productName: [''],
      productCount: [''],
      shootType: [''],
      modeName: ['']
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
      listStatus: ['']
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
        listStatus: [this.taskEdit.list[i].listStatus]

      });
      this.listForms.push(list);
    }
  }

  /*     });
      this.productForms.push(product);
    }
  } */
  getAllTask() {

    this.taskManagementService.getAllTaskData().subscribe(data => {
    this.taskholder = data;
    this.taskholder.forEach((customer) => {
      if (this.id === customer._id) {
        this.taskEdit = customer;
        this.addNewForm();
        this.addNewTaskForm();
        this.addNewShootForm();
        this.addNewListForm();

      console.log(this.taskEdit);
// tslint:disable-next-line: no-unused-expression
    } error => {
      console.log(error);
    };

  });
});
}
updateTask(value) {
  this.taskManagementService.UpdateTask(value).subscribe(data => {
    this.taskEdit = data;
    this.router.navigate(['task/viewtask', this.editview]);
  }, error => {
    console.log(error);
  });
}

cancel() {
  this.router.navigate(['task/viewtask', this.editview]);
}
getUnit() {
  this.unitSort =  localStorage.getItem('unit');
  this.roleSort = localStorage.getItem('role');
}
}
