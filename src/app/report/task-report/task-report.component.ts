import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { fbind } from 'q';
import { error } from 'util';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.css']
})
export class TaskReportComponent implements OnInit {
  TaskReportForm: FormGroup;
  taskValue: any;
  unit;
  userRole: string;
  userUnit: string;
  taskReport: any;
  name;
  role = ['photographer', 'editing'];
  displayRole = false;
  displayName = false;
  afterNameSelect = false;
  afterYearSelect = false;
  editing = false;
  photosuit = false;
  bssshow = false;
  userName: any;
  studioValue = [];
  secondValue: any;
  thirdValue: any;
  monthValue: any;
  year = ['2018', '2019', '2020', '2021', '2022'];
  nameSelected: any;
  allMonth = [{ month: 'January', value: 1 }, { month: 'February', value: 2 }, { month: 'March', value: 3 }, { month: 'April', value: 4 },
  { month: 'May', value: 5 }, { month: 'June', value: 6 }, { month: 'July', value: 7 }, { month: 'August', value: 8 },
  { month: 'September', value: 9 }, { month: 'October', value: 10 }, { month: 'November', value: 11 }, { month: 'December', value: 12 }
  ];
  selectedYear: any;
  BssValue: any[];

  constructor(private fb: FormBuilder, private reportService: ReportService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllUnitName();
    this.creatForm();
   /*  this.getUserRole(); */
    this.getAllUserName();
    
  }
  creatForm() {
    this.TaskReportForm = this.fb.group({
      units: [''],
      roles: [''],
      nameEmp: [''],
      year: ['']
    });
  }

  getAllUnitName() {
    this.reportService.getAllUnit().subscribe(data => {
      this.unit = data[0].leadUnit;
    }, err => {
      console.log(err);
    });
  }

  SelectUnit(e) {
   /*  this.TaskReportForm.reset(); */
    this.userUnit = e.value;
    this.reportService.getByUnit(e.value).subscribe(data => {
    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].units === 'Studio') {
        this.displayRole = true;
      } else if (data[i].units === 'BSS') {
        this.bssshow = true;
        this.displayName = true;
      }
    }
    this.getUserName();
    }, err => {
      console.log(err);
    });
  }
/*   getUserRole() {
    this.userRole = localStorage.getItem('role');
    this.userUnit = localStorage.getItem('unit');
  } */
  SelectRole(e) {
    this.userRole = e.value;
    this.displayName = true;
    if (this.userUnit === 'Studio') {
    if ( e.value === 'photographer') {
      this.name = this.userName.filter(data => data.role === 'photographer');
     this.photosuit = true;
     this.editing = false;
    } else if ( e.value !== 'photographer') {
      this.name = this.userName.filter( data => (data.role !== 'photographer') && (data.unit === 'Studio'));
      this.editing = true;
      this.photosuit = false;
    }
  }
  }
  getUserName() {
    if (this.userUnit === 'BSS') {
      this.name = this.userName.filter( data => data.unit === 'BSS');
      console.log(this.name);
    }
  }

  getAllUserName() {
    this.reportService.getAllUserName().subscribe(data => {
      this.userName = data;
     /*  console.log(this.userName); */
    }, err => {
      console.log(err);
    });
  }

  SelectName(e) {
    this.nameSelected = e.value;
   /*  console.log(e.value); */
    this.reportService.getDataByName(e.value).subscribe(data => {
      this.monthValue = data;
     /*  console.log(data); */
      if (this.userUnit === 'Studio') {
        if (this.userRole !== 'photographer') {
            this.studioValue = [];
          const firstValue = data.map(value => value.product);
         for ( let i = 0; i <= firstValue.length - 1; i++ ) {
           this.thirdValue = firstValue[i];
           for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
             this.secondValue = this.thirdValue[j];
             this.studioValue.push(this.secondValue);
           }
           this.getTotalProductCount();
           this.getImageCount();
         }
        } else if (this.userRole === 'photographer') {
          this.studioValue = [];
          const firstValue = data.map(value => value.shoot);
         for ( let i = 0; i <= firstValue.length - 1; i++ ) {
           this.thirdValue = firstValue[i];
           for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
             this.secondValue = this.thirdValue[j];
             this.studioValue.push(this.secondValue);
             /* console.log(this.studioValue); */
           }
           this.getPhotoProductCount();
         }
        }
      } else if (this.userUnit === 'BSS') {
        this.BssValue = [];
        const firstValue = data.map(value => value.list);
       for ( let i = 0; i <= firstValue.length - 1; i++ ) {
         this.thirdValue = firstValue[i];
         for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
           this.secondValue = this.thirdValue[j];
           this.BssValue.push(this.secondValue);
         }
         this.getListCount();
       }
      }
      /* console.log(this.studioValue); */
     
      this.afterNameSelect = true;
    }, err => {
      console.log(err);
    });
  }
  SelectYear(e) {
    this.selectedYear = e.value;
    this.reportService.getDataByYear(this.nameSelected, e.value).subscribe( data => {
      if (this.userUnit === 'Studio') {
        if (this.userRole !== 'photographer') {
            this.studioValue = [];
          const firstValue = data.map(value => value.product);
         for ( let i = 0; i <= firstValue.length - 1; i++ ) {
           this.thirdValue = firstValue[i];
           for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
             this.secondValue = this.thirdValue[j];
             this.studioValue.push(this.secondValue);
           }
         }
        } else if (this.userRole === 'photographer') {
          this.studioValue = [];
          const firstValue = data.map(value => value.shoot);
         for ( let i = 0; i <= firstValue.length - 1; i++ ) {
           this.thirdValue = firstValue[i];
           for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
             this.secondValue = this.thirdValue[j];
             this.studioValue.push(this.secondValue);
             /* console.log(this.studioValue); */
           }
            this.getPhotoProductCount();
         }
        }
      } else if (this.userUnit === 'BSS') {
        this.BssValue = [];
        const firstValue = data.map(value => value.list);
        for ( let i = 0; i <= firstValue.length - 1; i++ ) {
          this.thirdValue = firstValue[i];
          for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
            this.secondValue = this.thirdValue[j];
            this.BssValue.push(this.secondValue);
            /* console.log(this.studioValue); */
          }
        }
      }
      this.afterYearSelect = true;
    }, err => {
      console.log(err);
    });
  }
  SelectMonth(e) {
    this.reportService.getDataByYearAndMonth(this.nameSelected, this.selectedYear, e.value).subscribe( data => {
      if (this.userUnit === 'Studio') {
        if (this.userRole !== 'photographer') {
            this.studioValue = [];
          const firstValue = data.map(value => value.product);
         for ( let i = 0; i <= firstValue.length - 1; i++ ) {
           this.thirdValue = firstValue[i];
           for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
             this.secondValue = this.thirdValue[j];
             this.studioValue.push(this.secondValue);
           }
         }
        } else if (this.userRole === 'photographer') {
          this.studioValue = [];
          const firstValue = data.map(value => value.shoot);
         for ( let i = 0; i <= firstValue.length - 1; i++ ) {
           this.thirdValue = firstValue[i];
           for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
             this.secondValue = this.thirdValue[j];
             this.studioValue.push(this.secondValue);
             /* console.log(this.studioValue); */
           }
         }
        }
      }  else if (this.userUnit === 'BSS') {
        this.BssValue = [];
        const firstValue = data.map(value => value.list);
        for ( let i = 0; i <= firstValue.length - 1; i++ ) {
          this.thirdValue = firstValue[i];
          for ( let j = 0; j <= this.thirdValue.length - 1; j++) {
            this.secondValue = this.thirdValue[j];
            this.BssValue.push(this.secondValue);
            /* console.log(this.studioValue); */
          }
        }
      }
    }, err => {
      console.log(err);
    });
  }
  getTotalProductCount() {
    let tot = 0;
    for (let i = 0; i <= this.studioValue.length - 1; i++) {
      tot += this.studioValue[i].productCount;
    }
    return tot;
  }
  getImageCount() {
    let vak = 0;
    for (let i = 0; i <= this.studioValue.length - 1; i++) {
      vak += this.studioValue[i].imageCount;
    }
    return vak;
  }
  getPhotoProductCount() {
    let vak = 0;
    for (let i = 0; i <= this.studioValue.length - 1; i++) {
      vak += this.studioValue[i].productCount;
    }
    return vak;
  }
  getListCount() {
    let listcount = 0;
    for (let i = 0; i <= this.BssValue.length - 1; i++) {
      listcount += this.BssValue[i].listCount;
    }
    return listcount;
  }
  getProductLive() {
    let listcount = 0;
    for (let i = 0; i <= this.BssValue.length - 1; i++) {
      if (this.BssValue[i].noOfProductLive !== null) {
      listcount += this.BssValue[i].noOfProductLive;
    }
    }
    return listcount;
  }
}
