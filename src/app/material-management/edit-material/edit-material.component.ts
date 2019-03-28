import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialManagementService } from '../material-management.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  materialDetailForm: FormGroup;
  materialEdit: any;
  materialType: any;
  materialModel: MaterialModel[];
  materialValue: MaterialModel;
  id;
  shootStatus = ['completed','not completed', 'partial'];
  paymentStatus = ['yes','no'];
  shootType;
  materialStatus;
  dispatchType;
  constructor(private marerialManagementService: MaterialManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.id = params.get('id');
    })
    this.createForm();
    this.getAllMaterial();
    this.getShootType();
    this.getMaterialStatus();
    this.getDispatchType();
  }
  createForm(){
    this.materialDetailForm = this.fb.group({     
      workOrderID: [''],
      date: ['',Validators.required],
      customerName: [''],
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
  getAllMaterial(){
    this.marerialManagementService.getAllMaterial().subscribe(data=>{
      this.materialModel = data;
      this.materialModel.forEach(element => {
        if(this.id === element._id){
          this.materialEdit = element;
        }
      });
    },error =>{
      console.log(error);
    })
  }
  updateMaterial(data){
    this.marerialManagementService.getUpdateMaterial(data).subscribe(data =>{
      this.materialEdit = data;
      this.router.navigate(['material/viewmaterial']);
    },error => {
      console.log(error);
    })   
  }
  cancel(){
    this.router.navigate(['material/viewmaterial']);
  }
  getShootType(){
    this.marerialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].shootType;
      console.log(this.materialValue);
      this.shootType = this.materialType;
    })
  }
  getMaterialStatus(){
    this.marerialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data [0].materialStatus;
      this.materialStatus = this.materialType;
    })
  }
  getDispatchType(){
    this.marerialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].dispatchType;
      this.dispatchType = this.materialType;
    })
  }  
}
