import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TaskModel } from '../shared/task-management.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private http: HttpClient) { }

  getAllUnit(): Observable<any> {
    const addUrl = 'getallunit';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<TaskModel[]>(url);
  }

  getByUnit(data): Observable<any> {
    const addUrl = 'getbyunit/';
    const url: string = this.serviceUrl + addUrl + data;
    return this.http.get<TaskModel[]>(url);
  }
  getByRole(data): Observable<any> {
    const addUrl = 'getbyrole/';
    const url: string = this.serviceUrl + addUrl + data;
    return this.http.get<TaskModel[]>(url);
  }
  getAllUserName(): Observable<any> {
    const addUrl = 'unitName';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<TaskModel[]>(url);
  }
  getDataByName(data): Observable<any> {
    const addUrl = 'getdatabyname/';
    const url: string = this.serviceUrl + addUrl + data;
    return this.http.get<TaskModel[]>(url);
  }

  getDataByYear(data, value): Observable<any> {
    const addUrl = 'getdatabyYear/';
    const url: string = this.serviceUrl + addUrl + data + '/' + value;
    return this.http.get<TaskModel[]>(url);
  }
  getDataByYearAndMonth(name, year, month): Observable<any> {
    const addUrl = 'getdatabyYearandmonth/';
    const url: string = this.serviceUrl + addUrl + name + '/' + year + '/' + month;
    return this.http.get<TaskModel[]>(url);
  }
}
