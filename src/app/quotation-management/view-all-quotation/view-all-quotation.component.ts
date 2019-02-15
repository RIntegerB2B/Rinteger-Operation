import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuotationManagementService} from './../quotation-management.service';
import { Quotation } from './../../shared/quotation.model';

@Component({
  selector: 'app-view-all-quotation',
  templateUrl: './view-all-quotation.component.html',
  styleUrls: ['./view-all-quotation.component.css']
})
export class ViewAllQuotationComponent implements OnInit {
  quotation: Quotation[];
  constructor(private quotationManagementService: QuotationManagementService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAllQuotation();
  }
  getViewQuotation(data)   {
    this.router.navigate(['quotation/viewsinglequotation', data._id]);
  }
  /* getEditQuotation(data)   {
    this.router.navigate(['editworkorder', this.leadId, data._id]);
  } */
  getAllQuotation() {
    this.quotationManagementService.allQuotation().subscribe(data => {
      this.quotation = data;
      console.log('all work order', this.quotation);
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleQuotation(row)   {
    this.quotationManagementService.deleteSingleQuotation(row._id).subscribe(data => {
      this.quotation = data;
      console.log('all view', this.quotation);
    }, error => {
      console.log(error);
    });
  }
}
