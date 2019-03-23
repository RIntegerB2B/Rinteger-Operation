import { Component, OnInit, Inject } from '@angular/core';
import { Expense } from '../../shared/expense.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup; 
  expenseModel: Expense[];  
  expenseEdit: Expense;
  id;
  ExpenseType = ['Shoot','Others'];
  Paymode = ['Cash','Cheque'];
  gst = ['With GST','Non GST'];
  constructor(private fb: FormBuilder,
     private expenseManagementService: ExpenseManagementService,
     private route: ActivatedRoute,
    private router: Router
     ) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {this.id = params.get('id');})  
    this.getAllExpense();
    this.createForm();    
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
      expensesDescription: ['', Validators.required],
      gst: ['',Validators.required]
    });
  }
  getAllExpense() {
    this.expenseManagementService.allExpense().subscribe(data => {
      this.expenseModel = data;
      this.expenseModel.forEach((customer) => {
        if (this.id === customer._id)       {
          this.expenseEdit = customer;
          console.log(this.expenseEdit);
        }
    });
    }, error => {
      console.log(error);
    });
  }  
  updateExpense(row) {
    this.expenseManagementService.editExpense(row).subscribe(data => {
      this.expenseModel = data;
      this.router.navigate(['expense/viewExpense']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['expense/viewExpense']);
  }
}
