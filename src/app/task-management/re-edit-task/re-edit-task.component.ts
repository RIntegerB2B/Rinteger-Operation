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
  units = ['Studio', 'BSS', 'Technologies'];
  priority = ['low', 'medium', 'high', 'critical'];
  unitName: any;
  taskname: any;
  unitSort: string;
  roleSort: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private taskManagementService: TaskManagementService,
     private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.editview = params.get('editview');
      });
      this.createtask();
      this.getAllTask();
      this.getDepartment();
      this.getUnitWiseName();
      this.getUnit();
  }
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
      } else {
        console.log('error occure');
      }
      }
    );
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
    department: [''],
    assignedTo: [''],
    assignedBy: [''],
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
      modeName: ['']
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
        modeName: [this.taskEdit.shoot[i].modeName]

      });
      console.log(shoot);
      this.ShootForms.push(shoot);
    }
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

  updateTask(taskForm: FormGroup, row) {
  this.taskManagementService.EditTask(taskForm.value, row._id).subscribe(data => {
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
/*   console.log(this.unitName.filter(data => data.unit === e.value)); */
  this.taskname = this.unitName.filter(data => data.unit === e.value);
}

getUnit() {
  this.unitSort =  localStorage.getItem('unit');
  this.roleSort = localStorage.getItem('role');
}
}
