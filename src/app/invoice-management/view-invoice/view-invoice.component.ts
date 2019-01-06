
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  leadId;
  workId;
  invoice: Invoice[];
  constructor(
    private invoiceService: InvoiceService, private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
    this.leadId = this.route.snapshot.params.leadId;
    this.workId = this.route.snapshot.params.workId;
    this.getAllInvoice();
  }
  getViewInvoice(data)   {
    console.log('dataData', data);
    this.router.navigate(['invoice/viewsingleinvoice', this.leadId, data._id]);
  }
  getEditQuotation(data)   {
    this.router.navigate(['editworkorder', this.leadId, data._id]);
  }
  getAllInvoice() {
    this.invoiceService.viewAllInvoice(this.leadId).subscribe(data => {
      this.invoice = data;
      console.log('all invoice', this.invoice);
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleInvoice(row)   {
    this.invoiceService.deleteSingleInvoice(this.leadId,
       row._id).subscribe(data => {
      this.invoice = data;
      console.log('all view', this.invoice);
    }, error => {
      console.log(error);
    });
  }
}
