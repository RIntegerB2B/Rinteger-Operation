import { Component, OnInit, Inject } from '@angular/core';
import { Expense } from '../../shared/expense.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  customerModel: Expense[];
  expenseModel:Expense;
  customerEdit: Expense;
  id;
  ExpenseType = ['Shoot','Others'];
  Paymode = ['Cash','Check'];
  constructor(private fb: FormBuilder,
     private expenseManagementService: ExpenseManagementService,
     private route: ActivatedRoute,
    private router: Router
     ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    /* this.getSingleLeads(); */
    this.createForm();
    this.getAllExpense();
 
    
  }
  createForm() {
    this.expenseForm = this.fb.group({
      
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      expenseType: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      location: ['', Validators.required],      
      date: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paid: ['', Validators.required],
      vouNo: ['', Validators.required],
      expensesDescription: ['', Validators.required]
    });
  }
  getAllExpense() {
    this.expenseManagementService.allExpense().subscribe(data => {
      this.customerModel = data;
      this.customerModel.forEach((customer) => {
        if (this.id === customer._id)       {
          this.customerEdit = customer;
          console.log(this.customerEdit);
        }
    });
    }, error => {
      console.log(error);
    });
  }


  /* updateExpense(expenseForm:FormGroup) {
    this.customerEdit = new Expense(
      expenseForm.controls.mobileNumber.value,
      expenseForm.controls.name.value,
      expenseForm.controls.companyName.value,
      expenseForm.controls.expenseType.value,
      expenseForm.controls.modeOfPayment.value,
      expenseForm.controls.location.value,
      expenseForm.controls.date.value,            
      expenseForm.controls.totalAmount.value,
      expenseForm.controls.paid.value,
      expenseForm.controls.totalAmount.value - expenseForm.controls.paid.value,
      expenseForm.controls.vouNo.value,
      expenseForm.controls.expensesDescription.value
     
    );
    this.expenseManagementService.editExpense(this.expenseModel).subscribe(data => {
      this.expenseModel = data;
      this.router.navigate(['expense/viewExpense']);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['expense/viewExpense']);
  }
 */
 /*  getSingleLeads() {
    this.expenseManagementService.singleExpense(this.id).subscribe(data => {
      this.customerEdit = data;
      console.log('expense', this.customerEdit);
    }, error => {
      console.log(error);
    });
  } */

  
  updateExpense( row) {
    this.expenseManagementService.editExpense(row).subscribe(data => {
      this.customerModel = data;
      this.router.navigate(['expense/viewExpense']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['expense/viewExpense']);
  }
}
