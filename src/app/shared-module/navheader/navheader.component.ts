import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './../shared.service';
import { AuthenticationService } from './../auth-service/authentication.service';
@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {
  userId;
  userRole: string;

  constructor(public sharedService: SharedService, private authenticationService: AuthenticationService,  private router: Router) {
    this.sharedService.hideMenuTrans();
   }

  ngOnInit() {
  }
  logOutSession()   {
    this.authenticationService.logout();
    this.router.navigate(['/account/login']);
  }
  getTask()   {
    this.userId = sessionStorage.getItem('userId');
    this.router.navigate(['/task/viewtask', this.userId]);
  }
  getCompleted()   {
    this.router.navigate(['/workorder/viewallworkorder', 0]);
  }
  getTicket()   {
    this.userId = sessionStorage.getItem('userId');
    this.router.navigate(['/ticket/ticketview', this.userId]);
  }
  getMaterial()   {
    this.userId = sessionStorage.getItem('userId');
    this.router.navigate(['/material/front']);
  }

}
