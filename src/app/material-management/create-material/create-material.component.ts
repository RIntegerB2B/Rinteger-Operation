import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialManagementService } from '../material-management.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materialDetailsForm: FormGroup;
  materialModel: any;
  materialValue: MaterialModel;
  id;
  message;
  action;
  paymentStatus = ['yes', 'no'];
  shootType = ['Indoor', 'outdoor'];
  shootStatus = ['completed', 'not completed', 'partial'];
  materialStatus = ['received', 'not received'];
  dispatchType = ['travels', 'self'];
  constructor(private materialManagementService: MaterialManagementService,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.createForm();
    this.addSingleMaterial();
  }
  createForm() {
    this.materialDetailsForm = this.fb.group({
      workOrderID: [''],
      date: ['', Validators.required],
      customerName: ['', Validators.required],
      receivedBy: [''],
      productType: [''],
      noOfProduct: [''],
      shootType: [''],
      shootStatus: [''],
      paymentStatus: [''],
      dispatchType: [''],
      materialStatus: [''],
      remark: ['']
    });
  }
  addSingleMaterial() {
    this.materialManagementService.getAllWorkOrider().subscribe(data => {
      this.materialModel = data;
      this.materialModel.forEach(element => {
        if (this.id === element._id) {
          this.materialValue = element;
          console.log(this.materialValue);
        }
      });
    }, error => {
      console.log(error);
    })
  }
  updateMaterial(data) {
    this.materialManagementService.createMaterial(data).subscribe(data => {
      if (data === true) {
        this.message = 'This file is already added'
        this.snackBar.open(this.message, this.action, {
          duration: 3000
        });
      } else {
        this.message = 'This file is added Successfully'
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
}
