import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from './../../shared/task-management.model';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  @Input() productData: TaskModel;
  constructor() { }

  ngOnInit() {
  }

}
