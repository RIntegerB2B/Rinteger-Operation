import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MaterialManagementService } from './../material-management.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialModel } from '../../shared/material-management.model';
import { Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-view-single-material',
  templateUrl: './view-single-material.component.html',
  styleUrls: ['./view-single-material.component.css']
})
export class ViewSingleMaterialComponent implements OnInit {
  materialDetailsForm: FormGroup;
  materialModel: MaterialModel;
  id; 
  constructor(private materialManagementService: MaterialManagementService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>
    {
      this.id = params.get('id');
    })
    this.createForm();
    this. getSingleMaterial();
  }
  createForm(){
    this.materialDetailsForm = this.fb.group({
      date: ['',Validators.required],
      customerName: ['',Validators.required],
      receivedBy: [''],
      productType: [''],
      noOfProduct: [''],
      shootType: [''],
      shootStatus: [''],
      paymentStatus: [''],
      dispatchType: [''],
      materialStatus: [''],
      remark: ['']
    })
  }
  getSingleMaterial(){
    this.materialManagementService.getSingleMaterial(this.id).subscribe(data => {
      this.materialModel = data;
    })
  }
  getEdit(data){
    this.router.navigate(['material/editmaterial',data._id]);
  }
  cancel(){
    this.router.navigate(['material/viewmaterial']);
  }
}
