import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderService } from './../work-order.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { DateSearch } from './search.model';
@Component({
  selector: 'app-view-all-workorder',
  templateUrl: './view-all-workorder.component.html',
  styleUrls: ['./view-all-workorder.component.css']
})
export class ViewAllWorkorderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  workOrder: any;
  gstValue = [{ text: 'withGST' }, { text: 'withoutGST ' }]
  workOrderModel: WorkOrder[] =[];
  totalAmount = 0;
  totalTax = 0;
  matdatasource = new MatTableDataSource([]);
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  dateSearch: DateSearch;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  workOrderForm: FormGroup;
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
  constructor(private workOrderService: WorkOrderService,  private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllWorkOrder();
    this.createForm();
  }
  getAllWorkOrder() {
    this.workOrderService.allWorkOrder().subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder>(data);
      this.workOrder.paginator = this.paginator;
      this.workOrder = data;
      this.workOrderModel = data;
      this.array = data;
      console.log(this.workOrderModel);
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    }
    );
  }
  createForm() {
    this.workOrderForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      monthData: ['', Validators.required],
      yearData: ['', Validators.required]
    });
  }
  filterWorkOrder(data)  {
    this.workOrder = new MatTableDataSource<WorkOrder>(data);
    this.workOrder.paginator = this.paginator;
    this.workOrder = data;
    this.workOrderModel = data;
  }
  searchDate(workOrderForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.fromDate = workOrderForm.controls.fromDate.value;
    this.dateSearch.toDate = workOrderForm.controls.toDate.value;
    this.workOrderService.workOrderDateSearch(this.dateSearch).subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder> (data);
      this.workOrder.paginator = this.paginator;
      this.workOrderModel = data;
      this.workOrder = data;
      
      
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  searchMonth(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.month = leadForm.controls.monthData.value;
    this.dateSearch.year = leadForm.controls.yearData.value;
    this.workOrderService.workOrderMonthSearch(this.dateSearch).subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder>(data);
      this.workOrder.paginator = this.paginator;
      this.workOrder = data;
      this.workOrderModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  searchWithoutGST() {
    this.workOrderService.workOrderWithOutGST().subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder>(data);
      this.workOrder.paginator = this.paginator;
      this.workOrder = data;
      this.workOrderModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  searchWithGST() {
    this.workOrderService.workOrderWithGST().subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder>(data);
      this.workOrder.paginator = this.paginator;
      this.workOrder = data;
      this.workOrderModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  getTotal() {
    let total = 0;
    for (let i = 0; i < this.workOrderModel.length; i++) {
      console.log(this.workOrderModel[i].allTotal);
        if (this.workOrderModel[i].allTotal) {
            total += this.workOrderModel[i].allTotal;
            this.totalAmount = total;
        }
    }
    return total;
}
getTax() {
  let tax = 0;
  for (let i = 0; i < this.workOrderModel.length; i++) {
      if (this.workOrderModel[i].tax) {
        tax += this.workOrderModel[i].tax;
          this.totalTax = tax;
      }
  }
  return tax;
}
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.workOrder = part;
  }
  createProfomaInvoice(row) {
    this.router.navigate(['proformainvoice/createproformainvoice'
    , row.leadID, row._id]);
  }
  viewProfomaInvoice(row) {
    this.router.navigate(['proformainvoice/viewproformainvoice', row.workOrderID]);
  }
  viewInvoice(row) {
    this.router.navigate(['invoice/viewinvoice',
    row.workOrderID]);
  }
  createInvoice(row) {
    this.router.navigate(['invoice/createinvoice', row.leadID, row._id]);
  }
  getViewWorkOrder(data) {
    this.router.navigate(['workorder/viewsingleworkorder', data._id]);
  }
  getInvoice(data) {
    this.router.navigate(['createinvoice', data.leadID, data._id]);
  }
  getEditWorkOrder(data) {
    this.router.navigate(['workorder/editworkorder', data._id]);
  }
  getDeleteSingleWorkOrder(row) {
    this.workOrderService.deleteSingleWorkOrder(row._id).subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder>(data);
      this.workOrder.paginator = this.paginator;
      this.workOrder = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
}
