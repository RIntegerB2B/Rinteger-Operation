import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from './../../shared/task-management.model';

@Component({
  selector: 'app-view-shoot',
  templateUrl: './view-shoot.component.html',
  styleUrls: ['./view-shoot.component.css']
})
export class ViewShootComponent implements OnInit {
  @Input() shootData: TaskModel;
  constructor() { }

  ngOnInit() {
  }

}
