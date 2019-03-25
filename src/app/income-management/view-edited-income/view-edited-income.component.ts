import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeModel } from '../../shared/income.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IncomeManagementService } from '../income-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';

@Component({
  selector: 'app-view-edited-income',
  templateUrl: './view-edited-income.component.html',
  styleUrls: ['./view-edited-income.component.css']
})
export class ViewEditedIncomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  incomeDetailsForm: FormGroup;
  matdatasource = new MatTableDataSource([]);
  incomeModel: any;
  incomeValue: IncomeModel;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public arry: any;

  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;

  constructor(private incomemanagementservice: IncomeManagementService, private router: Router,
    private fb: FormBuilder) { }

  createForm() {
    this.incomeDetailsForm = this.fb.group({
      workOrderID: ['', Validators.required],
      customerName: ['', Validators.required],
      date: ['', Validators.required],
      companyName: ['', Validators.required],
      modeOfIncome: ['', Validators.required],
      allTotal: ['', Validators.required],
      paidAmount: ['', Validators.required],
      tds: ['', Validators.required],
      balanceAmount: ['', Validators.required],
      gst: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.createForm();
    this.findAllInome();
  }
  findAllInome() {
    this.incomemanagementservice.getFindAll().subscribe(data => {
      this.incomeModel = data;
      this.incomeValue = data;
    })
  }
  filterIncome(data) {
    this.incomeModel = new MatTableDataSource<IncomeModel>(data);
    this.incomeModel.paginator = this.paginator;
    this.incomeModel = data;
  }
  getEditIncome(data) {
    this.router.navigate(['income/editincomesheet', data._id]);
  }
  getDeleteIncome(data) {
    this.incomemanagementservice.DeleteIncomeSheet(data).subscribe(data => {
      this.incomeModel = data;
    })
  }
  getTds() {
    this.incomemanagementservice.getTDS().subscribe(data => {
      this.incomeModel = data;
      this.incomeValue = data;
    })
  }
  getAll() {
    this.incomemanagementservice.getFindAll().subscribe(data => {
      this.incomeModel = data;
      this.incomeValue = data;
    })
  }
}
