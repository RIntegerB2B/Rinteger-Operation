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
  proformaInvoice: ProformaInvoice[];
  matdatasource = new MatTableDataSource([]);
  constructor(private proformaInvoiceService: ProformaInvoiceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAllProformaInvoice();
  }
  getAllProformaInvoice() {
    this.proformaInvoiceService.allAllProfomaInvoice().subscribe(data => {
      this.proformaInvoice = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    }
    );
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
      this.proformaInvoice = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
      console.log('all view', this.proformaInvoice);
    }, error => {
      console.log(error);
    });
  }
}
