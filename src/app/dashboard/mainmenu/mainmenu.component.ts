import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Lead } from '../../shared/lead.model';
import { Invoice } from '../../shared/invoice.model';
import { WorkOrder } from '../../shared/workorder.model';
import { Quotation } from '../../shared/quotation.model';
import { ProformaInvoice } from '../../shared/proformaInvoice.model';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  leadModel: Lead[] = [];
  invoiceModel: Invoice[] = [];
  workOrderModel: WorkOrder[] = [];
  quotationModel: Quotation[] = [];
  proformaInvoice: ProformaInvoice[] = [];
  sumWorkOrder = 0;
  sumInvoice = 0;
  sumPerformaInvoice = 0;
  sumQuotation = 0;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllLeads();
    this.viewAllinvoice();
    this.getAllWorkOrder();
    this.getAllQuotation();
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
  getAllQuotation() {
    this.dashboardService.allQuotation().subscribe(data => {
      this.quotationModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
}
