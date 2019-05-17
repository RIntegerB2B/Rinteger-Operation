import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderService } from './navheader.service';
@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {
  userId;
  userRole: string;

  constructor(public navheaderService: NavheaderService, private router: Router) {
   }

  ngOnInit() {
  }
  logOutSession()   {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('menus');
    this.router.navigate(['/account/login']);
  }
  getTask()   {
    this.userId = localStorage.getItem('userId');
    this.router.navigate(['/task/viewtask/', this.userId]);
  }
  getCompleted()   {
    this.router.navigate(['/workorder/viewallworkorder', 0]);
  }
  getTicket()   {
    this.userId = localStorage.getItem('userId');
    this.router.navigate(['/ticket/ticketview', this.userId]);
  }
  getMaterial()   {
    this.userId = localStorage.getItem('userId');
    this.router.navigate(['/material/front']);
  }

}
