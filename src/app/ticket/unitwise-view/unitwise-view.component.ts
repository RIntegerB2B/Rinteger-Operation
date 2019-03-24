import { Component, OnInit } from '@angular/core';
import { TicketService } from './../ticket.service';
import { TicketModel } from './../ticket/ticket.Model';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-unitwise-view',
  templateUrl: './unitwise-view.component.html',
  styleUrls: ['./unitwise-view.component.css']
})
export class UnitwiseViewComponent implements OnInit {
  ticketholder: TicketModel;
  id: string;
  constructor(private ts: TicketService, private route: ActivatedRoute,
    private router: Router) {
  /*   this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      }
    ); */

  }

  ngOnInit() {
    this.getStudioTicket();
    this.getBssTicket();
    this.getTechTicket();
  }

  getStudioTicket() {
    this.ts.getStudioTicket().subscribe(data => {
      this.ticketholder = data;
    }, error => {
      console.log(error);
    }
    );
  }

  getBssTicket() {
    this.ts.getBssTicket().subscribe(data => {
    this.ticketholder = data;
    }, error => { console.log(error); }
    );
  }

  getTechTicket() {
    this.ts.getTechTicket().subscribe(data => {
    this.ticketholder = data;
    }, error => { console.log(error); }
    );
  }

}
