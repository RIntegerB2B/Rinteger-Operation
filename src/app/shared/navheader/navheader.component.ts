import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderService } from './navheader.service';
@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {

  constructor(public navheaderService: NavheaderService, private router: Router) {
   }

  ngOnInit() {
  }
  logOutSession()   {
    localStorage.removeItem('loginUser');
    this.router.navigate(['/account/login']);
  }

}
