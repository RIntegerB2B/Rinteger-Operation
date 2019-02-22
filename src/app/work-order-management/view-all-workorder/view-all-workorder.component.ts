import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderService } from './../work-order.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
@Component({
  selector: 'app-view-all-workorder',
  templateUrl: './view-all-workorder.component.html',
  styleUrls: ['./view-all-workorder.component.css']
})
export class ViewAllWorkorderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  workOrder: any;
  matdatasource = new MatTableDataSource([]);
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  constructor(private workOrderService: WorkOrderService,  private router: Router) { }

  ngOnInit() {
    this.getAllWorkOrder();
  }
  getAllWorkOrder() {
    this.workOrderService.allWorkOrder().subscribe(data => {
      this.workOrder = new MatTableDataSource<WorkOrder>(data);
      this.workOrder.paginator = this.paginator;
      this.workOrder = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    }
    );
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
