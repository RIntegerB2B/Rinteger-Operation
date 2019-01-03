import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
import { ProformaInvoiceService } from './../proforma-invoice.service';
import { ActivatedRoute } from '@angular/router';
import { LeadManagementService } from './../../lead-management/lead-management.service';
import { WorkOrderService } from './../../work-order-management/work-order.service';
import { WorkOrder } from './../../shared/workorder.model';
import {WorkOrderPdf} from '../../shared/workorderpdf.model';

@Component({
  selector: 'app-create-proforma',
  templateUrl: './create-proforma.component.html',
  styleUrls: ['./create-proforma.component.css']
})
export class CreateProformaComponent implements OnInit {

  constructor(private fb: FormBuilder, private proformaInvoiceService: ProformaInvoiceService
    , private route: ActivatedRoute, private leadManagementService: LeadManagementService,
    private workOrderService: WorkOrderService
    ) { }
  requirements: FormArray;
  proformaInvoiceDetailsForm: FormGroup;
  proformaInvoice: ProformaInvoice;
  workOrder: WorkOrder;
  arryValue: any = [];
  sum = 0;
  leadId;
  workId;
  requirementsData;
  taxVal;
  gstVal;
  workOrderPDFModel: WorkOrderPdf;
  ngOnInit() {
    this.leadId = this.route.snapshot.params.leadId;
    this.workId = this.route.snapshot.params.workId;
    this.createForm();
    this.viewWorkOrder();
  }
  createForm() {
    this.proformaInvoiceDetailsForm = this.fb.group({
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
  viewCompanyDetails() {
    this.workOrderService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
      this.gstVal = this.workOrderPDFModel[0].gst;
    }, error => {
      console.log(error);
    });
  }
  createLeadProformaInvoice(proformaInvoiceDetailsForm: FormGroup)   {
    this.proformaInvoice = new ProformaInvoice(
      proformaInvoiceDetailsForm.controls.customerID.value,
      proformaInvoiceDetailsForm.controls.customerName.value,
      proformaInvoiceDetailsForm.controls.companyName.value,
      proformaInvoiceDetailsForm.controls.companyAddress.value,
      proformaInvoiceDetailsForm.controls.mobileNumber.value,
      proformaInvoiceDetailsForm.controls.emailId.value,
      proformaInvoiceDetailsForm.controls.leadID.value,
      proformaInvoiceDetailsForm.controls.requirements.value,
      proformaInvoiceDetailsForm.controls.workOrderID.value,
      proformaInvoiceDetailsForm.controls.date.value,
      proformaInvoiceDetailsForm.controls.expiryDate.value,
      proformaInvoiceDetailsForm.controls.allTotal.value,
      proformaInvoiceDetailsForm.controls.subTotal.value,
      proformaInvoiceDetailsForm.controls.tax.value
    );
    this.proformaInvoiceService.createProformaInvoice(this.proformaInvoice, this.leadId).subscribe(data => {
      this.proformaInvoice = data;
      console.log('singlePerformaInvoice', this.proformaInvoice);
    }, error => {
      console.log(error);
    });
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
  viewWorkOrder()   {
    this.workOrderService.viewSingleWorkOrder(this.leadId, this.workId).subscribe(data => {
      this.workOrder = data;
      console.log('single Work Order Id', this.workOrder);
      this.addForm();
      this.getTotal();
      this.viewCompanyDetails();
    }, error => {
      console.log(error);
    });
  }
  addForm() {
      for (let i = 0; i <= this.workOrder.requirements.length - 1; i++)     {
        this.requirementsData = this.fb.group({
          id: [this.workOrder.requirements[i]._id],
          item: [this.workOrder.requirements[i].item],
          quantity: [this.workOrder.requirements[i].quantity],
          price: [this.workOrder.requirements[i].price],
          discount: [this.workOrder.requirements[i].discount],
          description: [this.workOrder.requirements[i].description],
          total: [this.workOrder.requirements[i].total]
        });
        this.requirementsForms.push(this.requirementsData);
      }
  }
  get requirementsForms() {
    return this.proformaInvoiceDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.proformaInvoiceDetailsForm.controls.requirements;
    this.arryValue.controls.forEach(x => {
      const parsed = +x.get('total').value;
      this.sum += parsed;
      console.log(this.sum);
    });
  }
  deleteRequirements(i) {
    this.requirementsForms.removeAt(i);
    this.getTotal();
  }
}

