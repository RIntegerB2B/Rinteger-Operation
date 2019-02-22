import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';

@Component({
  selector: 'app-view-all-invoice',
  templateUrl: './view-all-invoice.component.html',
  styleUrls: ['./view-all-invoice.component.css']
})
export class ViewAllInvoiceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  invoice: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  matdatasource = new MatTableDataSource([]);
  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
this.getAllInvoice();
}
getViewInvoice(data)   {
this.router.navigate(['invoice/viewsingleinvoice', data._id]);
}
getEditInvoice(data)   {
  console.log('invoice data', data);
  this.router.navigate(['invoice/editinvoice', data._id]);
}
getAllInvoice() {
this.invoiceService.allAllInvoice().subscribe(data => {
  this.invoice = new MatTableDataSource<Invoice>(data);
  this.invoice.paginator = this.paginator;
  this.invoice = data;
  this.array = data;
  this.totalSize = this.array.length;
  this.iterator();
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
  this.invoice = part;
}
getDeleteSingleInvoice(row)   {

this.invoiceService.deleteSingleInvoice(row._id).subscribe(data => {
  this.invoice = new MatTableDataSource<Invoice>(data);
  this.invoice.paginator = this.paginator;
  this.invoice = data;
  this.array = data;
  this.totalSize = this.array.length;
  this.iterator();
}, error => {
  console.log(error);
});
}
}
