import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialManagementService } from '../material-management.service';
import { MaterialModel } from '../../shared/material-management.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-dispatched-material',
  templateUrl: './dispatched-material.component.html',
  styleUrls: ['./dispatched-material.component.css']
})
export class DispatchedMaterialComponent implements OnInit {
  materialDetailsForm: FormGroup;
  materialModel: any = [];
  materialValue: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;

  constructor(private materialManagementService: MaterialManagementService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getDispatchMaterial();
    this.createForm();
  }
getDispatchMaterial() {
  this.materialManagementService.getDispatchedMaterial().subscribe( data => {
    this.materialModel = data;
    this.materialModel = new MatTableDataSource<MaterialModel>(data);
    this.materialModel.paginator = this.paginator;
    this.materialModel = data;
    this.array = data;
    this.totalSize = this.array.length;
    this.iterator();
  }, error => {
    console.log(error);
  });
}
createForm() {
  this.materialDetailsForm = this.fb.group({
    srchterm: [''],
    fromDate: [''],
    toDate: [''],
    finddate: [''],
    date: ['', Validators.required],
    customerName: ['', Validators.required],
    productType: [''],
    /*   shootType: [''], */
    /*     noOfProduct: [''],
        shootStatus: [''], */
  });
}
getViewMaterial(data) {
  this.router.navigate(['material/viewsinglematerial', data._id]);
}
getEditMaterial(data) {
  this.router.navigate(['material/editmaterial', data._id]);
}
getDeleteMaterial(test) {
  this.materialManagementService.deleteMaterial(test).subscribe(data => {
    this.materialModel = data;
    this.materialValue = data;
    /*   this.getNoOfProduct(); */
    this.materialModel = new MatTableDataSource<MaterialModel>(data);
    this.materialModel.paginator = this.paginator;
    this.materialModel = data;
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
  this.materialModel = part;
}
}
