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
  invoice: Invoice[];
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
  this.invoice = data;
  this.matdatasource.data = data;
  this.matdatasource.paginator = this.paginator;
}, error => {
  console.log(error);
});
}
getDeleteSingleInvoice(row)   {

this.invoiceService.deleteSingleInvoice(row._id).subscribe(data => {
  this.invoice = data;
  this.matdatasource.data = data;
  this.matdatasource.paginator = this.paginator;
}, error => {
  console.log(error);
});
}
}
