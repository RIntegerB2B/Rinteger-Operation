import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { LeadManagementService } from './../lead-management.service';
import { CreateCustomerService } from './../../customer-management/create-customer/create-customer.service';
import { Router } from '@angular/router';
import { Lead } from './../../shared/lead.model';
import { LeadAddComponent } from './../lead-add/lead-add.component';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorkOrder } from './../../shared/workorder.model';
import { Quotation } from './../../shared/quotation.model';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.component.html',
  styleUrls: ['./view-lead.component.css'],
  providers: [CreateCustomerService, LeadManagementService]
})
export class ViewLeadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  leadDetailsForm: FormGroup;
  leadModel: any;
  leadModelCheck: Lead;
  workOrder: WorkOrder[];
  quotation: Quotation[];
  leadModeldata;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
matdatasource = new MatTableDataSource([]);
  constructor(private fb: FormBuilder,
    private leadManagementService: LeadManagementService,
    private createCustomerService: CreateCustomerService, private dialog: MatDialog,
    private router: Router) {
   }
  ngOnInit() {
    this.createForm();
    this.getAllLeads();
  }
  createForm() {
    this.leadDetailsForm = this.fb.group({
      leadID: [''],
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      leadOwner: ['', Validators.required],
      leadSource: ['', Validators.required],
      leadStatus: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', Validators.required],
      requirements: this.fb.array([{
        item: [''],
        quantity: [''],
        price: [''],
        discount: [''],
        description: ['']
      }]),
    });
  }
  getViewLead(data) {
    this.router.navigate(['lead/viewsinglelead', data._id]);
  }
  createWorkOrder(row) {
    this.leadManagementService.checkWorkOrder(row).subscribe(data => {
      this.leadModelCheck = data;
      if (data.length === 0) {
        this.createCustomerService.openCustomer(row);
      } else {
        this.router.navigate(['workorder/creatework', data[0]._id, row._id]);
      }
    }, error => {
      console.log(error);
    });
  }
  createQuotation(row) {
    this.leadManagementService.checkWorkOrder(row).subscribe(data => {
      this.leadModelCheck = data;
      console.log('check', this.leadModelCheck);
      if (data.length === 0) {
        this.createCustomerService.openCustomer(row);
      } else {
        this.router.navigate(['quotation/createquotation', data[0]._id, row._id]);
      }
    }, error => {
      console.log(error);
    });
  }
  addLead() {
    this.router.navigate(['lead/leadadd']);
  }
  getEditLead(leadDetailsForm: FormGroup, id) {
     this.router.navigate(['lead/leadedit', id]);
  }
  getDeleteLead(leadDetailsForm: FormGroup, row) {
    row.editing = false;
    leadDetailsForm.reset();
    this.leadManagementService.deleteLead(row).subscribe(data => {
      this.leadModel = new MatTableDataSource<Lead>(data);
      this.leadModel.paginator = this.paginator;
      this.leadModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  viewWorkOrder(id)   {
    this.leadManagementService.viewAllWorkOrder(id.leadID).subscribe(data => {
      this.workOrder = data;
      if (this.workOrder.length !== 0)     {
        this.router.navigate(['workorder/viewworkorder', id.leadID]);
        } else     {
          this.createWorkOrder(id);
        }
      /* console.log('leads', this.leadModel); */
    }, error => {
      console.log(error);
    });
  }
  viewQuotation(id)   {
    this.leadManagementService.viewAllQuotation(id.leadID).subscribe(data => {
      this.quotation = data;
      if (this.quotation.length !== 0)     {
        this.router.navigate(['quotation/viewquotation', id.leadID]);
        } else     {
          this.createWorkOrder(id);
        }
      /* console.log('leads', this.leadModel); */
    }, error => {
      console.log(error);
    });
  }
  getAllLeads() {
    this.leadManagementService.allLead().subscribe(data => {
      this.leadModel = new MatTableDataSource<Lead>(data);
      this.leadModel.paginator = this.paginator;
      this.leadModel = data;
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
    this.leadModel = part;
  }
}
