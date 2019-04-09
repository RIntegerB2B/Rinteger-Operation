import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from './../../shared/task-management.model';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  @Input() listData: TaskModel;
  constructor() { }

  ngOnInit() {
  }

}
