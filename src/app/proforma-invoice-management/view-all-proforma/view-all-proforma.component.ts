import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProformaInvoiceService } from './../proforma-invoice.service';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';

@Component({
  selector: 'app-view-all-proforma',
  templateUrl: './view-all-proforma.component.html',
  styleUrls: ['./view-all-proforma.component.css']
})
export class ViewAllProformaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  proformaInvoice: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  matdatasource = new MatTableDataSource([]);
  constructor(private proformaInvoiceService: ProformaInvoiceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAllProformaInvoice();
  }
  getAllProformaInvoice() {
    this.proformaInvoiceService.allAllProfomaInvoice().subscribe(data => {
      this.proformaInvoice = new MatTableDataSource<ProformaInvoice>(data);
      this.proformaInvoice.paginator = this.paginator;
      this.proformaInvoice = data;
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
    this.proformaInvoice = part;
  }
  getViewProformaInvoice(data)   {
    this.router.navigate(['proformainvoice/viewsingleproformainvoice',
    data._id]);
  }
  getEditProfomaInvoice(data)   {
    this.router.navigate(['proformainvoice/editprofomainvoice',  data._id]);
  }

  getDeleteSingleProformaInvoice(row)   {
    this.proformaInvoiceService.deleteSingleProformaInvoice(row._id).subscribe(data => {
      this.proformaInvoice.paginator = this.paginator;
      this.proformaInvoice = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
}
