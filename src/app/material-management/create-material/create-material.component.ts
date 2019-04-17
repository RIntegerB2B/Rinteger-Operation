import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MaterialManagementService } from '../material-management.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../../shared/product.model';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materialDetailsForm: FormGroup;
  materialModel: any;
  materialValue: MaterialModel;
  product: FormArray;
  id;
  message;
  materialType;
  action;
 /*  paymentStatus = ['yes', 'no']; */
 /*  shootType = ['Indoor', 'outdoor']; */
  shootStatus = ['completed', 'not completed', 'partial'];
  materialStatus = ['received', 'not received'];
  dispatchType = ['travels', 'self'];
  unit = ['Studio', 'BSS', 'Technologies'];
  materialEdit: any;
  constructor(private materialManagementService: MaterialManagementService,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.createForm();
    this.addSingleMaterial();
    this.getMaterialType();
  }
  createForm() {
    this.materialDetailsForm = this.fb.group({
      workOrderID: [''],
      DCnumber: [''],
      date: ['', Validators.required],
      customerName: ['', Validators.required],
      receivedBy: [''],
      unit: [''],
    /*   productType: [''],
      noOfProduct: [''], */
    /*   shootType: [''], */
    /*   shootStatus: [''], */
   /*    paymentStatus: [''], */
      modeOfInward: [''],
      materialType: [''],
    /*   modeOfOutward: [''], */
      /* dispatchType: [''], */
      /* materialStatus: [''], */
      remark: [''],
      product: this.fb.array([])
    });
    this.addForm();
  }
  addForm() {
    const product = this.fb.group({
    productType: [''],
    noOfProduct: [''],
    modelType: ['']
      });
    this.productForms.push(product);
  }

  get productForms() {
    return this.materialDetailsForm.get('product') as FormArray;
  }
  deleteProducts(i) {
    this.productForms.removeAt(i);
  }
  addSingleMaterial() {
    this.materialManagementService.getAllWorkOrider().subscribe(data => {
      this.materialModel = data;
      this.materialModel.forEach(element => {
        if (this.id === element._id) {
          this.materialValue = element;
        }
      });
    }, error => {
      console.log(error);
    });
  }
  updateMaterial(materialDetailsForm: FormGroup, workOrderID, date, userName) {
    this.materialModel = new MaterialModel();
    this.materialModel.workOrderID = workOrderID.value;
    this.materialModel.DCnumber = materialDetailsForm.controls.DCnumber.value;
    this.materialModel.date = date.value;
    this.materialModel.customerName = userName.value;
    this.materialModel.receivedBy = materialDetailsForm.controls.receivedBy.value;
    this.materialModel.unit = materialDetailsForm.controls.unit.value;
  /*   this.materialModel.shootStatus = materialDetailsForm.controls.shootStatus.value; */
   /*  this.materialModel.paymentStatus = materialDetailsForm.controls.paymentStatus.value; */
    this.materialModel.modeOfInward = materialDetailsForm.controls.modeOfInward.value;
    this.materialModel.materialType = materialDetailsForm.controls.materialType.value;
   /*  this.materialModel.dispatchType = materialDetailsForm.controls.dispatchType.value; */
   /*  this.materialModel.materialStatus = materialDetailsForm.controls.materialStatus.value; */
    this.materialModel.remark = materialDetailsForm.controls.remark.value;
    this.materialModel.product = materialDetailsForm.controls.product.value;
    this.materialManagementService.createMaterial( this.materialModel).subscribe(data => {
      if (data === true) {
        this.message = 'This file is already added';
        this.snackBar.open(this.message, this.action, {
          duration: 3000
        });
      } else {
        this.message = 'This file is added Successfully';
        this.snackBar.open(this.message, this.action, {
          duration: 3000
        });
        this.materialModel = data;
      }
    }, error => {
      console.log(error);
    });
    this.router.navigate(['material/front']);
  }
  cancel() {
    this.router.navigate(['material/front']);
  }

  getMaterialType() {
    this.materialManagementService.getMaterialSetting().subscribe(data => {
      this.materialEdit = data[0].materialType;
      this.materialType = this.materialEdit;
    });
  }
}
