import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from './../../shared/task-management.model';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.css']
})
export class ViewModuleComponent implements OnInit {
  @Input() moduleData: TaskModel;
  constructor() { }

  ngOnInit() {
  }

}
