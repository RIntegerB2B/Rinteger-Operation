import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';
import { WorkOrderPdf } from '../../shared/workorderpdf.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-single-invoice',
  templateUrl: './view-single-invoice.component.html',
  styleUrls: ['./view-single-invoice.component.css']
})
export class ViewSingleInvoiceComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router, private invoiceService: InvoiceService,
     private fb: FormBuilder) { }
  singleInvoiceForm: FormGroup;
  leadId;
  invId;
  invoice: Invoice;
  workOrderPDFModel: WorkOrderPdf;
  customerModel: Customer;
  printArray = new Array;
  printArray1 = new Array;
  doc;
  templateOption: boolean;
  selected = 'withDiscount';
  tempArray = new Array;
  allValues = new Array;
  TypesOfTerms = ['Production Terms', 'Digital Marketing Terms'];
  templates = ['With Discount + GST', 'Without Discount + GST' , 'With Discount + SGST + CGST' , 'Without Discount + SGST + CGST'];
  
  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.invId = params.get('invId');
      }
    );
    this.viewSingleInvoice();
    this.createForm();
  }

  cancelInvoice()   {
    this.router.navigate(['invoice/viewallinvoice']);
  }
  viewSingleInvoice() {
    this.invoiceService.viewSingleInvoice(
      this.invId).subscribe(data => {
        this.invoice = data;
        this.customerDetails();
        this.viewCompanyDetails();
      }, error => {
        console.log(error);
      });
  }
  customerDetails() {
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data; }, error => {
        console.log(error);
      });
  }
  viewCompanyDetails() {
    this.invoiceService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
      console.log('pdf details', this.workOrderPDFModel);
    }, error => {
      console.log(error);
    });
  }
  showTemplate() {
    this.templateOption = true;
  }
  createForm() {
    this.singleInvoiceForm = this.fb.group({
      termsType: [''],
    });
  }
}
