import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProformaInvoiceService } from './../proforma-invoice.service';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';

@Component({
  selector: 'app-view-proforma',
  templateUrl: './view-proforma.component.html',
  styleUrls: ['./view-proforma.component.css']
})
export class ViewProformaComponent implements OnInit {
  leadId;
  workId;
  proformaInvoice: ProformaInvoice[];
  constructor(
    private proformaInvoiceService: ProformaInvoiceService, private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
    this.leadId = this.route.snapshot.params.leadId;
    this.workId = this.route.snapshot.params.workId;
    this.getAllProformaInvoice();
  }
  getViewProformaInvoice(data)   {
    console.log('dataData', data);
    this.router.navigate(['viewsingleproformainvoice', this.leadId, data._id]);
  }
  /* getEditQuotation(data)   {
    this.router.navigate(['editworkorder', this.leadId, data._id]);
  } */
  getAllProformaInvoice() {
    this.proformaInvoiceService.viewAllProformaInvoice(this.leadId).subscribe(data => {
      this.proformaInvoice = data;
      console.log('all proformainvoice', this.proformaInvoice);
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleProformaInvoice(row)   {
    this.proformaInvoiceService.deleteSingleProformaInvoice(this.leadId,
       row._id).subscribe(data => {
      this.proformaInvoice = data;
      console.log('all view', this.proformaInvoice);
    }, error => {
      console.log(error);
    });
  }
}
