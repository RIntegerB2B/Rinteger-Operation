import { Component, OnInit } from '@angular/core';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../customer-management/create-customer/customer.model';
import { ActivatedRoute } from '@angular/router';
import { WorkOrderService } from './../work-order.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WorkOrder } from './../../shared/workorder.model';
@Component({
  selector: 'app-edit-workorder',
  templateUrl: './edit-workorder.component.html',
  styleUrls: ['./edit-workorder.component.css']
})
export class EditWorkorderComponent implements OnInit {
  requirements: FormArray;
  workOrderDetailsForm: FormGroup;
  workOrder: WorkOrder;
  workOrderData: WorkOrder;
  leadModel: Lead[] = [];
  customerModel: Customer;
  arryValue: any = [];
  requirementsData;
  sum = 0;
  leadId: string;
  workId: string;
  constructor(private fb: FormBuilder, private workOrderService: WorkOrderService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.leadId = this.route.snapshot.params.leadId;
    this.workId = this.route.snapshot.params.workId;
    this.viewWorkOrder();
    this.createForm();
  }
  createForm() {
    this.workOrderDetailsForm = this.fb.group({
      customerID: [''],
      companyName: [''],
      workOrderID: [''],
      leadID: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      date: ['', Validators.required],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  viewWorkOrder()   {
    this.workOrderService.viewSingleWorkOrder(this.leadId, this.workId).subscribe(data => {
      this.workOrder = data;
      console.log('single Work Order Id', this.workOrder);
      this.addForm();
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
   /* editRequirements(account)    {
    account.readInput = true;
  } */
  updateWorkOrder(workOrderDetailsForm: FormGroup)   {
    this.workOrder = new WorkOrder(
      workOrderDetailsForm.controls.customerID.value,
      workOrderDetailsForm.controls.companyName.value,
      workOrderDetailsForm.controls.workOrderID.value,
      workOrderDetailsForm.controls.leadID.value,
      workOrderDetailsForm.controls.name.value,
      workOrderDetailsForm.controls.mobileNumber.value,
      workOrderDetailsForm.controls.emailId.value,
      workOrderDetailsForm.controls.date.value,
      workOrderDetailsForm.controls.requirements.value,
      workOrderDetailsForm.controls.allTotal.value,
      workOrderDetailsForm.controls.subTotal.value,
      workOrderDetailsForm.controls.tax.value
    );
    this.workOrderService.updateSingleWorkOrder(this.workOrder, this.leadId, this.workId).subscribe(data => {
      this.workOrderData = data;
      console.log('singleWorkUpdate', this.workOrder);
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
  addForm() {
    /* for (let j = 0;  j <= this.leadModel.length - 1; j++)     {
      for (let i = 0; i <= this.leadModel[j].requirements.length - 1; i++)     {
        this.requirementsData = this.fb.group({
          id: [this.leadModel[j].requirements[i]._id],
          item: [this.leadModel[j].requirements[i].item],
          quantity: [this.leadModel[j].requirements[i].quantity],
          price: [this.leadModel[j].requirements[i].price],
          discount: [this.leadModel[j].requirements[i].discount],
          description: [this.leadModel[j].requirements[i].description],
          total: [this.leadModel[j].requirements[i].total]
        });
        this.requirementsForms.push(this.requirementsData);
      }
    } */
      for (let i = 0; i <= this.workOrder.requirements.length - 1; i++)     {
        this.requirementsData = this.fb.group({
         /*  id: [this.workOrder.requirements[i]._id], */
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
    return this.workOrderDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.workOrderDetailsForm.controls.requirements;
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
