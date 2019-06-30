import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DateSearch } from './dateSearch';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-all-invoice',
  templateUrl: './view-all-invoice.component.html',
  styleUrls: ['./view-all-invoice.component.css']
})
export class ViewAllInvoiceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: ElementRef;

  invoice: any;
  dateSearch: DateSearch;
  invoiceDetailsForm: FormGroup;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  invoiceModel: Invoice;
  matdatasource = new MatTableDataSource([]);
  allMonth = [{ month: 'January' }, { month: 'February' }, { month: 'March' }, { month: 'April' },
  { month: 'May' }, { month: 'June' }, { month: 'July' }, { month: 'August' },
  { month: 'September' }, { month: 'October' }, { month: 'November' }, { month: 'October' }
  ];
  allYear = [
    { year: 2018 },
    { year: 2019 },
    { year: 2020 },
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
    { year: 2025 },
    { year: 2026 },
    { year: 2027 },
    { year: 2028 },
  ];
  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.createForm();
    this.getAllInvoice();
  }
  getViewInvoice(data) {
    this.router.navigate(['invoice/viewsingleinvoice', data._id]);
  }
  filterInvoice(data) {
    this.invoice = new MatTableDataSource<Invoice>(data);
    this.invoice.paginator = this.paginator;
    this.invoice = data;
  }
  createForm() {
    this.invoiceDetailsForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      monthData: ['', Validators.required],
      yearData: ['', Validators.required]
    });
  }
  getEditInvoice(data) {
    console.log('invoice data', data);
    this.router.navigate(['invoice/editinvoice', data._id]);
  }
  getAllInvoice() {
    this.invoiceService.allAllInvoice().subscribe(data => {
      this.invoice = new MatTableDataSource<Invoice>(data);
      this.invoice.paginator = this.paginator;
      this.invoice = data;
      this.invoiceModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.invoice = part;
  }

  searchDate(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.fromDate = leadForm.controls.fromDate.value;
    this.dateSearch.toDate = leadForm.controls.toDate.value;
    this.invoiceService.invoiceDateSearch(this.dateSearch).subscribe(data => {
      this.invoice = new MatTableDataSource<Invoice>(data);
      this.invoiceModel = data;
      this.invoice.paginator = this.paginator;
      this.invoice = data;
    }, error => {
      console.log(error);
    });
  }
  searchMonth(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.month = leadForm.controls.monthData.value;
    this.dateSearch.year = leadForm.controls.yearData.value;
    this.invoiceService.invoiceMonthSearch(this.dateSearch).subscribe(data => {
      this.invoice = new MatTableDataSource<Invoice>(data);
      this.invoice.paginator = this.paginator;
      this.invoice = data;
      this.invoiceModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleInvoice(row) {

    this.invoiceService.deleteSingleInvoice(row._id).subscribe(data => {
      this.invoice = new MatTableDataSource<Invoice>(data);
      this.invoice.paginator = this.paginator;
      this.invoice = data;
      this.invoiceModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
}
/* 
ConvertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

  for (let index in objArray[0]) {
    row += index + ',';
  }
  row = row.slice(0, -1);
  //append Label row with line break
  str += row + '\r\n';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','

      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
} */

/* fireEvent()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
} */
/* download(){    
  var csvData = this.ConvertToCSV(this.invoiceModel);
                         var a = document.createElement("a");
                         a.setAttribute('style', 'display:none;');
                         document.body.appendChild(a);
                         var blob = new Blob([csvData], { type: 'text/csv' });
                         var url= window.URL.createObjectURL(blob);
                         a.href = url;
                         a.download = 'User_Results.csv';
                         a.click();
                         return 'success';
 }
}*/