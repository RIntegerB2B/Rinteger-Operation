import { Component, OnInit } from '@angular/core';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Invoice } from './../../shared/invoice.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { WorkOrderPdf } from '../../shared/workorderpdf.model';
import {InvoiceService} from '../invoice.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  requirements: FormArray;
  invoiceDetailsForm: FormGroup;
  invoice: Invoice;
  invoiceData: Invoice;
  leadModel: Lead[] = [];
  customerModel: Customer;
  arryValue: any = [];
  requirementsData;
  workOrderPDFModel: WorkOrderPdf;
  gstVal;
  sum = 0;
  leadId: string;
  invoiceId: string;
  message;
  action;
  constructor(private fb: FormBuilder, private invoiceService: InvoiceService
    , private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.invoiceId = this.route.snapshot.params.id;
    console.log('invoide id', this.invoiceId);
    this.viewInvoice();
    this.createForm();
    this.viewCompanyDetails();
  }
  createForm() {
    this.invoiceDetailsForm = this.fb.group({
      workOrderID: [''],
      customerID: [''],
      companyName: [''],
      companyAddress: [''],
      customerName: [''],
      invoiceID: [''],
      emailId: [''],
      leadID: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      date: [''],
      expiryDate: [''],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  viewInvoice()   {
    this.invoiceService.viewSingleInvoice(this.invoiceId).subscribe(data => {
      this.invoice = data[0];
      this.customerModel = data[0].customer;
      console.log(this.invoice);
      this.addForm();
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  addForm() {
    for (let i = 0; i <= this.invoice.requirements.length - 1; i++)     {
      this.requirementsData = this.fb.group({
        id: [this.invoice.requirements[i]._id],
        item: [this.invoice.requirements[i].item],
        quantity: [this.invoice.requirements[i].quantity],
        price: [this.invoice.requirements[i].price],
        discount: [this.invoice.requirements[i].discount],
        description: [this.invoice.requirements[i].description],
        total: [this.invoice.requirements[i].total]
      });
      this.requirementsForms.push(this.requirementsData);
    }
}
cancelEdit() {
  this.router.navigate(['invoice/viewallinvoice']);
}
checkGst(event) {
  if (event.checked) {
    this.gstVal = 0;
  } else {
    this.gstVal = this.workOrderPDFModel[0].gst;
  }
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
deleteRequirements(i) {
  this.requirementsForms.removeAt(i);
  this.getTotal();
}
updateInvoice(invoiceDetailsForm: FormGroup)   {
    this.message = 'Invoice Updated Successfully';
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
    this.invoice.invoiceID = this.invoiceDetailsForm.controls.invoiceID.value;
    this.invoiceService.updateSingleInvoice(this.invoice, this.invoiceId).subscribe(data => {
    this.invoiceData = data[0];
    this.snackBar.open(this.message, this.action, {
      duration: 3000,
    });
    this.router.navigate(['invoice/viewallinvoice']);
  }, error => {
    console.log(error);
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
}
