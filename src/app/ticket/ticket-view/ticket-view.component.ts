import { Component, OnInit } from '@angular/core';
import { TicketModel } from './../ticket/ticket.Model';
import { TicketService } from './../ticket.service';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {
  ticketholder: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  count;
  all;
  filterWise;
  deadcount;
  studios; BSSs; technologys;
  units = [{ name: 'studio', counts: 0 }, { name: 'BSS', counts: 0 }, { name: 'technology', counts: 0 }];
  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);




  constructor(private ts: TicketService) { }

  ngOnInit() {
    this.retriveTicket();
  }

  retriveTicket() {
    this.ts.retriveTicket().subscribe(data => {
      this.ticketholder = data;
      this.ticketholder = new MatTableDataSource<any>(data);
      this.ticketholder.paginator = this.paginator;
      this.ticketholder = data;
      this.all = this.ticketholder.length;
      this.filterWise = this.ticketholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => { console.log(error); }
    );

  }

  getunitwiseTicket(name) {
    this.ts.getunitwiseTicket(name).subscribe(data => {
      this.ticketholder = data;
      this.ticketholder = new MatTableDataSource<any>(data);
      this.ticketholder.paginator = this.paginator;
      this.ticketholder = data;
      this.filterWise = this.ticketholder;
      this.array = data;
      this.totalSize = this.array.length;

    }, error => {
      console.log(error);
    }
    );
  }

  filterWiseTest() {

    this.studios = this.filterWise.filter(data => data.units === 'studio');
    this.BSSs = this.filterWise.filter(data => data.units === 'BSS');
    this.technologys = this.filterWise.filter(data => data.units === 'technology');
    this.units[0].counts = this.studios.length;
    this.units[1].counts = this.BSSs.length;
    this.units[2].counts = this.technologys.length;
  }

  deadlinedTicket() {
    this.ts.deadlinedTicket().subscribe(data => {
      this.ticketholder = data;
      this.deadcount = this.ticketholder.length;
      this.ticketholder = new MatTableDataSource<any>(data);
      this.ticketholder.paginator = this.paginator;
      this.ticketholder = data;
      this.filterWise = this.ticketholder;
      this.array = data;
      this.totalSize = this.array.length;
    }, error => {
      console.log(error);
    }
    );
  }





  /*  uniqTicket(data) {
 
     this.ts.uniqTicket(data).subscribe(data =>{this.ticketholder=data;
       console.log(this.ticketholder);
   },error =>{console.log(error);}
   );
   } */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.ticketholder = part;
  }

}
