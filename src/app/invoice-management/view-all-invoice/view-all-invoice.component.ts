import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';

@Component({
  selector: 'app-view-all-invoice',
  templateUrl: './view-all-invoice.component.html',
  styleUrls: ['./view-all-invoice.component.css']
})
export class ViewAllInvoiceComponent implements OnInit {
  invoice: Invoice[];
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
}, error => {
  console.log(error);
});
}
getDeleteSingleInvoice(row)   {

this.invoiceService.deleteSingleInvoice(row._id).subscribe(data => {
  this.invoice = data;

}, error => {
  console.log(error);
});
}
}
