import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared-module/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public sharedService: SharedService) {
  }
  title = 'rinteger-operation';
  ngOnInit() {
    this.sharedService.menuItems();
  }

}
