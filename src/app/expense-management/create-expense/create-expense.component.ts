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
  ExpenseType = ['Shoot','Others'];
  Paymode = ['Cash','Check'];
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
      location:[''],
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
    this.customerModel = new Expense(
      customerDetailsForm.controls.mobileNumber.value,
      customerDetailsForm.controls.name.value,
      customerDetailsForm.controls.companyName.value,
      customerDetailsForm.controls.expenseType.value,
      customerDetailsForm.controls.modeOfPayment.value,
      customerDetailsForm.controls.location.value,
      customerDetailsForm.controls.date.value,            
      customerDetailsForm.controls.totalAmount.value,
      customerDetailsForm.controls.paid.value,
      customerDetailsForm.controls.totalAmount.value - customerDetailsForm.controls.paid.value,
      customerDetailsForm.controls.vouNo.value,
      customerDetailsForm.controls.expensesDescription.value
     
    );
    this.expenseManagementService.addSingleExpense(this.customerModel).subscribe(data => {
      this.customerModel = data;
      this.router.navigate(['expense/viewExpense']);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['expense/viewExpense']);
  }
}
