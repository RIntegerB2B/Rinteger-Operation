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
  quotation: Quotation[];
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
      this.quotation = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
      console.log('all work order', this.quotation);
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleQuotation(row)   {
    this.quotationManagementService.deleteSingleQuotation(row._id).subscribe(data => {
      this.quotation = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
      console.log('all view', this.quotation);
    }, error => {
      console.log(error);
    });
  }
}
