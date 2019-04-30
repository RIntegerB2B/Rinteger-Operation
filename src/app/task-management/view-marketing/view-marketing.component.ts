import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from './../../shared/task-management.model';

@Component({
  selector: 'app-view-marketing',
  templateUrl: './view-marketing.component.html',
  styleUrls: ['./view-marketing.component.css']
})
export class ViewMarketingComponent implements OnInit {
  @Input() marketingData: TaskModel;
  constructor() { }

  ngOnInit() {
  }

}
