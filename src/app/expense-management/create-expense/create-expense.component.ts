import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { Expense } from '../../shared/expense.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  customerDetailsForm: FormGroup;
  customerModel: Expense;
  editable = true;
  ExpenseType =  ['Shoot', 'Others'];
  Paymode = ['Cash', 'Check'];
  constructor(private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<CreateExpenseComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private expenseManagementService: ExpenseManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.customerDetailsForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      expenseType: [''],
      modeOfPayment: [''],
      location: [''],
      date: [''],
      totalAmount: ['', Validators.required],
      paid: ['', Validators.required],
      /* balance: ['', Validators.required], */
      vouNo: ['', Validators.required],
      expensesDescription: ['', Validators.required]
    });
  }
  cancel() {
    this.router.navigate(['expense/viewExpense']);
  }
  addSingleExpense(customerDetailsForm: FormGroup) {
    this.customerModel = new Expense();
     this.customerModel.mobileNumber = customerDetailsForm.controls.mobileNumber.value,
     this.customerModel.name = customerDetailsForm.controls.name.value,
     this.customerModel.companyName = customerDetailsForm.controls.companyName.value,
     this.customerModel.expenseType = customerDetailsForm.controls.expenseType.value,
     this.customerModel.modeOfPayment = customerDetailsForm.controls.modeOfPayment.value,
     this.customerModel.location = customerDetailsForm.controls.location.value,
     this.customerModel.date = customerDetailsForm.controls.date.value,
     this.customerModel.totalAmount = customerDetailsForm.controls.totalAmount.value,
     this.customerModel.paid = customerDetailsForm.controls.paid.value,
     this.customerModel.vouNo = customerDetailsForm.controls.vouNo.value,
     this.customerModel.expensesDescription = customerDetailsForm.controls.expensesDescription.value

    this.expenseManagementService.addSingleExpense(this.customerModel).subscribe(data => {
      this.customerModel = data;
      this.router.navigate(['expense/viewExpense']);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['expense/viewExpense']);
  }
}
