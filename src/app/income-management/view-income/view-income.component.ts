import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeModel } from '../../shared/income.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IncomeManagementService } from '../income-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-view-income',
  templateUrl: './view-income.component.html',
  styleUrls: ['./view-income.component.css']
})
export class ViewIncomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  incomeDetailsForm: FormGroup;
  incomeModel: any;


  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public arry: any;

  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  constructor(private fb: FormBuilder, private router: Router,
    private incomemanagementservice: IncomeManagementService, private dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
    /* this.findall(); */
  }
  createForm() {
    this.incomeDetailsForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      workOrderID: ['', Validators.required],
      customerName: ['', Validators.required],
      date: ['', Validators.required],
      companyName: ['', Validators.required],
      allTotal: ['', Validators.required]

    });
  }
  searchByDate(incomeDetailsForm: FormGroup) {
    this.incomeModel = new IncomeModel();
    this.incomeModel.fromDate = incomeDetailsForm.controls.fromDate.value;
    this.incomeModel.toDate = incomeDetailsForm.controls.toDate.value;
    this.incomemanagementservice.getByDate(this.incomeModel).subscribe(data => {
      this.incomeModel = data;
    }, error => {
      console.log(error);
    });
  }
  
  getEditIncome(data) {
    this.router.navigate(['income/editincome', data._id]);
  }

  getDeleteIncome(test) {
    this.incomemanagementservice.DeleteIncome(test).subscribe(data => {
      this.incomeModel = data;
    });
  }
  getIncomeSheet() {
    this.router.navigate(['income/viewincomesheet']);
  }

}
