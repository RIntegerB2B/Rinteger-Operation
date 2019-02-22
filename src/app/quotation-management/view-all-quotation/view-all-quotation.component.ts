import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuotationManagementService} from './../quotation-management.service';
import { Quotation } from './../../shared/quotation.model';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';

@Component({
  selector: 'app-view-all-quotation',
  templateUrl: './view-all-quotation.component.html',
  styleUrls: ['./view-all-quotation.component.css']
})
export class ViewAllQuotationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  quotation: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  matdatasource = new MatTableDataSource([]);
  constructor(private quotationManagementService: QuotationManagementService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAllQuotation();
  }
  getViewQuotation(data)   {
    this.router.navigate(['quotation/viewsinglequotation', data._id]);
  }
  getEditQuotation(data)   {
    this.router.navigate(['quotation/editquotation',  data._id]);
  }
  getAllQuotation() {
    this.quotationManagementService.allQuotation().subscribe(data => {
      this.quotation = new MatTableDataSource<Quotation>(data);
      this.quotation.paginator = this.paginator;
      this.quotation = data;
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
    this.quotation = part;
  }
  getDeleteSingleQuotation(row)   {
    this.quotationManagementService.deleteSingleQuotation(row._id).subscribe(data => {
      this.quotation = new MatTableDataSource<Quotation>(data);
      this.quotation.paginator = this.paginator;
      this.quotation = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
}
