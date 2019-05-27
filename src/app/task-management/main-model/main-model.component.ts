import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-model',
  templateUrl: './main-model.component.html',
  styleUrls: ['./main-model.component.css']
})
export class MainModelComponent implements OnInit {
  userUnit: string;

  constructor() { }

  ngOnInit() {
    this.getUnit();
  }
getUnit() {
  this.userUnit = sessionStorage.getItem('unit');
}
}
