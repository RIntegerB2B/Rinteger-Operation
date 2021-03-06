import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Invoice } from './../../shared/invoice.model';
import { InvoiceService } from './../invoice.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorkOrderService } from './../../work-order-management/work-order.service';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderPdf } from '../../shared/workorderpdf.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService
    , private route: ActivatedRoute, private router: Router
  ) { }
  requirements: FormArray;
  invoiceDetailsForm: FormGroup;
  invoice: Invoice;
  workOrder: WorkOrder;
  workOrderData: WorkOrder[];
  arryValue: any = [];
  sum = 0;
  leadId;
  workId;
  requirementsData;
  taxVal;
  gstVal;
  workOrderPDFModel: WorkOrderPdf;
  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.leadId = params.get('leadId');
        this.workId = params.get('workId');
      }
    );
    this.createForm();
    this.viewWorkOrder();
  }
  createForm() {
    this.invoiceDetailsForm = this.fb.group({
      customerID: [''],
      customerName: [''],
      companyName: [''],
      workOrderID: [''],
      companyAddress: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      leadID: ['', Validators.required],
      date: ['', Validators.required],
      expiryDate: ['', Validators.required],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  createLeadInvoice(invoiceDetailsForm: FormGroup) {
    this.invoice = new Invoice();
    this.invoice.customerID = invoiceDetailsForm.controls.customerID.value,
    this.invoice.leadID = invoiceDetailsForm.controls.leadID.value,
    this.invoice.requirements = invoiceDetailsForm.controls.requirements.value,
    this.invoice.workOrderID = invoiceDetailsForm.controls.workOrderID.value,
    this.invoice.date = invoiceDetailsForm.controls.date.value,
    this.invoice.expiryDate = invoiceDetailsForm.controls.expiryDate.value,
    this.invoice.allTotal = invoiceDetailsForm.controls.allTotal.value,
    this.invoice.subTotal = invoiceDetailsForm.controls.subTotal.value,
    this.invoice.tax = invoiceDetailsForm.controls.tax.value;
    this.invoiceService.createInvoice(this.invoice).subscribe(data => {
      this.getInvoiceStatus(data);
    }, error => {
      console.log(error);
    });
  }

  getInvoiceStatus(value) {
    this.invoiceService.setInvoiceStatus(value).subscribe(data => {
      /* this.workOrderData = data; */
      this.router.navigate(['invoice/viewallinvoice']);
    }, error => {
      console.log(error);
    });
  }
  cancelInvoice() {
    this.router.navigate(['workorder/viewallworkorder']);
  }
  addNewForm() {
    const requirements = this.fb.group({
      item: [''],
      quantity: [''],
      price: [''],
      discount: [''],
      description: [''],
      total: ['']
    });
    this.requirementsForms.push(requirements);
  }
  viewWorkOrder() {
    this.invoiceService.viewSingleWorkOrder(this.workId).subscribe(data => {
      this.workOrder = data;
      this.addForm();
      this.getTotal();
      this.viewCompanyDetails();
    }, error => {
      console.log(error);
    });
    this.addForm();
  }
  checkGst(event) {
    if (event.checked) {
      this.gstVal = 0;
    } else {
      this.gstVal = this.workOrderPDFModel[0].gst;
    }
  }
  addForm() {
    for (let i = 0; i <= this.workOrder[0].requirements.length - 1; i++) {
      this.requirementsData = this.fb.group({
        id: [this.workOrder[0].requirements[i]._id],
        item: [this.workOrder[0].requirements[i].item],
        quantity: [this.workOrder[0].requirements[i].quantity],
        price: [this.workOrder[0].requirements[i].price],
        discount: [this.workOrder[0].requirements[i].discount],
        description: [this.workOrder[0].requirements[i].description],
        total: [this.workOrder[0].requirements[i].total]
      });
      this.requirementsForms.push(this.requirementsData);
    }
  }
  get requirementsForms() {
    return this.invoiceDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.invoiceDetailsForm.controls.requirements;
    this.arryValue.controls.forEach(x => {
      const parsed = +x.get('total').value;
      this.sum += parsed;
      console.log(this.sum);
    });
  }
  viewCompanyDetails() {
    this.invoiceService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
      this.gstVal = this.workOrderPDFModel[0].gst;
    }, error => {
      console.log(error);
    });
  }
  deleteRequirements(i) {
    this.requirementsForms.removeAt(i);
    this.getTotal();
  }
}

