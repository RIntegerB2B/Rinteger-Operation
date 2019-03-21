import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ViewSingleExpenseComponent } from './view-single-expense/view-single-expense.component';
import { AmountDetailsComponent } from './amount-details/amount-details.component';
/* import { UploadCustomerComponent } from './upload-customer/upload-customer.component'; */

const routes: Routes = [
  {
    path: 'createExpense',
    component: CreateExpenseComponent
  },
  {
    path: 'viewExpense',
    component: ViewExpenseComponent
  },
  {
    path: 'editExpense/:id',
    component: EditExpenseComponent
  },
  {
    path: 'singleViewExpense/:id',
    component: ViewSingleExpenseComponent
  },
  {
    path: 'amountDetail',
    component: AmountDetailsComponent
  }
 /*  {
    path: 'upload',
    component: UploadCustomerComponent
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }

