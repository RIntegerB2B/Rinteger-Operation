import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../dashboard.service';
import { Lead } from './../../shared/lead.model';
import { Invoice } from './../../shared/invoice.model';
import { WorkOrder } from './../../shared/workorder.model';
import { Quotation } from './../../shared/quotation.model';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
@Component({
  selector: 'app-manimenu',
  templateUrl: './manimenu.component.html',
  styleUrls: ['./manimenu.component.css']
})
export class ManimenuComponent implements OnInit {
  leadModel: Lead[] = [];
  invoiceModel: Invoice[] = [];
  workOrderModel: WorkOrder[] = [];
  quotationModel: Quotation[] = [];
  proformaInvoice: ProformaInvoice[] = [];
  worKOrderLength: any = [];
  invoiceLength: any = [];
  performaInvoiceLength: any = [];
  quotationLength: any = [];
  sumWorkOrder = 0;
  sumInvoice = 0;
  sumPerformaInvoice = 0;
  sumQuotation = 0;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllLeads();
  }
  getAllLeads() {
    this.dashboardService.allLead().subscribe(data => {
      this.leadModel = data;
      this.worKOrderLength = this.leadModel.map(x => x.workOrder);
      this.invoiceLength = this.leadModel.map(x => x.invoice);
      this.performaInvoiceLength = this.leadModel.map(x => x.proformaInvoice);
      this.quotationLength = this.leadModel.map(x => x.proformaInvoice);

     this.sumWorkOrder = 0;
      this.sumInvoice = 0;
      this.sumPerformaInvoice = 0;
      this.sumQuotation = 0;
      for (let i = 0; i <= this.worKOrderLength.length - 1; i++) {
        const lengthOfWorkOrder = this.worKOrderLength[i].length;
        this.sumWorkOrder += lengthOfWorkOrder;
      }
      for (let i = 0; i <= this.invoiceLength.length - 1; i++) {
        const lengthOfInvoice = this.invoiceLength[i].length;
        this.sumInvoice += lengthOfInvoice;
      }
      for (let i = 0; i <= this.performaInvoiceLength.length - 1; i++) {
        const lengthOfPerformaInvoice = this.performaInvoiceLength[i].length;
        this.sumPerformaInvoice += lengthOfPerformaInvoice;
      }
      for (let i = 0; i <= this.quotationLength.length - 1; i++) {
        const lengthOfPerformaInvoice = this.quotationLength[i].length;
        this.sumQuotation += lengthOfPerformaInvoice;
      }
    }, error => {
      console.log(error);
    });
  }
}
