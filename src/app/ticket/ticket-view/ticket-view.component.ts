import { Component, OnInit } from '@angular/core';
import { TicketModel } from './../ticket/ticket.Model';
import { TicketService } from './../ticket.service';
import { from } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);


  

  constructor(private ts: TicketService) { }

  ngOnInit() {

    this.ts.retriveTicket().subscribe(data => {
    this.ticketholder = data;
      this.ticketholder = new MatTableDataSource<any>(data);
      this.ticketholder.paginator = this.paginator;
      this.ticketholder = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => { console.log(error); }
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
