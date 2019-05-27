import { Component, OnInit } from '@angular/core';
import { TicketModel } from './../ticket/ticket.Model';
import { TicketService } from './../ticket.service';
import { SharedService } from '../../shared-module/shared.service';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  hidenValue = true;
  count;
  all;
  filterWise;
  deadcount;
  studios; BSSs; technologys;
  units = [{ name: 'Studio', counts: 0 }, { name: 'BSS', counts: 0 }, { name: 'Technologies', counts: 0 },
  { name: 'Marketing', counts: 0}, { name: 'Operation', counts: 0}];
  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  userId: any;
  userRole: string;
  marketing: any;
  operation: any;

  constructor(private ts: TicketService, private router: Router, private route: ActivatedRoute,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      /* this.userRole = params.get ('role'); */
    });
    if (this.userRole === 'admin') {
      this.retriveTicket();
    } else {
      this.CompareUserId();
    }
    this.sharedService.hideMenuTrans();
    this.sharedService.menuItems();
  }
  retriveTicket() {
    this.hidenValue = true;
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
    }, error => { console.log(error); 
    });
  }
  getunitwiseTicket(name) {
    this.hidenValue = true;
    this.ticketholder = this.filterWise.filter(data =>
      data.units === name
    );
  }
  filterWiseTest() {
    this.studios = this.filterWise.filter(data => data.units === 'Studio');
    this.BSSs = this.filterWise.filter(data => data.units === 'BSS');
    this.technologys = this.filterWise.filter(data => data.units === 'Technologies');
    this.marketing = this.filterWise.filter(data => data.units === 'Marketing');
    this.operation = this.filterWise.filter(data => data.units === 'Operation');
    this.units[0].counts = this.studios.length;
    this.units[1].counts = this.BSSs.length;
    this.units[2].counts = this.technologys.length;
    this.units[3].counts = this.marketing.length;
    this.units[4].counts = this.operation.length;
  }
  deadlinedTicket() {
    this.hidenValue = true;
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
    });
  }

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
  CompareUserId() {
    this.hidenValue = true;
    this.ts.compareUserId(this.userId).subscribe(data => {
      this.ticketholder = data;
      this.deadcount = this.ticketholder.length;
      this.ticketholder = new MatTableDataSource<any>(data);
      this.ticketholder.paginator = this.paginator;
      this.ticketholder = data;
      this.filterWise = this.ticketholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.filterWiseTest();
    });
  }
  deleteTicket(value) {
    this.ts.deleteTicket(value._id).subscribe(data => {
      this.ticketholder = data;
    });
  }
  getMyIssue() {
    this.hidenValue = false;
    this.ts.getMyIssue(this.userId).subscribe(data => {
      this.ticketholder = data;
      this.ticketholder = new MatTableDataSource<any>(data);
      this.ticketholder.paginator = this.paginator;
      this.ticketholder = data;
      this.array = data;
      this.totalSize = this.array.length;
    }, error => {
      console.log(error);
    });
  }
}
