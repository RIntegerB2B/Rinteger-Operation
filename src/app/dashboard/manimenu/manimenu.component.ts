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
    this.viewAllinvoice();
    this.getAllWorkOrder();
  }
  viewAllinvoice() {
    this.dashboardService.allAllInvoice().subscribe(data => {
      this.invoiceModel = data;
      console.log(this.invoiceModel);
    }, error => {
      console.log(error);
    });
  }
  getAllLeads() {
    this.dashboardService.allLead().subscribe(data => {
      this.leadModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
  getAllWorkOrder() {
    this.dashboardService.allWorkOrder().subscribe(data => {
      this.workOrderModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
}
