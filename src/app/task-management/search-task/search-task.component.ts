import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from '../../shared/task-management.model';
@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {
  searchType = ['Name', 'ClientName', 'TaskTitle'];
  taskDetailsForm: FormGroup;
  @Input() taskholder: TaskModel;
  @Output() searchTask = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.taskDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchAll(filterData) {
    this.searchTask.emit(filterData);
  }
  searchBy(taskData, selectType, filter) {
    switch (selectType) {
      case 'Name': {
        taskData.forEach(data => {
          if (!data.assignedTo) {
            data.assignedTo = '';
          }
        });
        const filterData = taskData.filter(data => data.assignedTo.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      }
      case 'TaskNo': {
        taskData.forEach(data => {
          if (!data.taskNo) {
            data.taskNo = '';
          }
        });
        const filterData = taskData.filter(data => data.taskNo.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      }
      case 'ClientName': {
        taskData.forEach(data => {
          if (!data.clientName) {
            data.clientName = '';
          }
        });
        const filterData = taskData.filter(data =>
          data.clientName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      }
      case 'TaskTitle': {
        taskData.forEach(data => {
          if (!data.taskTitle) {
            data.taskTitle = '';
          }
        });
        const filterData = taskData.filter(data =>
          data.taskTitle.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      }
    /*   case 'Location': {
        taskData.forEach(data => {
          if (!data.location) {
            data.location = '';
          }
        });
        const filterData = taskData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchTask.emit(filterData);
        break;
      } */
    }
  }
}
