import { Injectable } from '@angular/core';
import { ActivityLogModel } from './../shared/activity-log.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrder } from '../shared/workorder.model';
import { Customer } from './../shared/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  getFindAllWorkorder(): Observable<WorkOrder[]> {
    const addUrl = 'findworkorder';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<WorkOrder[]>(url);
  }
  createmonthly(data): Observable<any> {
    const addUrl = 'createmonthly';
    const url: string = this.serviceUrl + addUrl;
    return this.http.post<ActivityLogModel[]>(url, data);
  }
  getAllactivityLog(): Observable<any> {
    const addUrl = 'findallactivity';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<ActivityLogModel[]>(url);
  }
  createweekly(data, id): Observable<any> {
    const addUrl = 'updateweekly/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.put<ActivityLogModel[]>(url, data);
  }
  getFindAllMonthly(id): Observable<any> {
    const addUrl = 'findallmonth/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.get<ActivityLogModel[]>(url);
  }
  updateMonthToWeek(data) {
    const addUrl = 'updatemonthtoweek/';
    const url: string = this.serviceUrl + addUrl + data.workOrderID;
    return this.http.put<ActivityLogModel[]>(url, data);
  }
  copyMonthlyToWeek(data, id) {
    const addUrl = 'copydatatoweek/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.put<ActivityLogModel[]>(url, data);
  }
  getFindAllWeekly(): Observable<any> {
    const addUrl = 'findallweeksheet';
    const url: string = this.serviceUrl + addUrl ;
    return this.http.get<ActivityLogModel[]>(url);
  }
  getAssignedTo(): Observable<any> {
    const addUrl = 'findassignedto';
    const url: string = this.serviceUrl + addUrl ;
    return this.http.get<ActivityLogModel[]>(url);
  }
  getWeekToTask(id): Observable<any> {
    const addUrl = 'findweekvalue/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.http.get<ActivityLogModel[]>(url);
  }
  addAssignValue(data, id) {
    const addUrl = 'copydatatoweekok/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.put<ActivityLogModel[]>(url, data);
  }
  getStatus(): Observable<any> {
    const addUrl = 'findstatus/';
    const url: string = this.serviceUrl + addUrl ;
    return this.http.get<ActivityLogModel[]>(url);
  }
  deleteMonthlyPlan(id): Observable<any> {
    const addUrl = 'deletemonthlyPlan/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.delete<ActivityLogModel[]>(url);
  }
  deleteMonthlyPlanList(id): Observable<any> {
    const addUrl = 'deletemonthlyPlanlist/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.delete<ActivityLogModel[]>(url);
  }
  deleteCompletePlan(id): Observable<any> {
    const addUrl = 'deleteCompletePlan/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.delete<ActivityLogModel[]>(url);
  }
  deleteWeeklyPlan(id): Observable<any> {
    const addUrl = 'deleteWeeklyPlan/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.delete<ActivityLogModel[]>(url);
  }
  getYearWise(data): Observable<any> {
    const addUrl = 'getyear';
    const url: string = this.serviceUrl + addUrl ;
    return this.http.post<ActivityLogModel[]>(url, data);
  }
  getSelectedActivityLog(id): Observable<any> {
    const addUrl = 'getselectedactivitylog/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.get<ActivityLogModel[]>(url);
  }
  getSelectedWeek(id): Observable<any> {
    const addUrl = 'getselectedactivitylog/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.http.get<ActivityLogModel[]>(url);
  }
  getSelectedMonthlyPlan(id): Observable<any> {
    const addUrl = 'getselectedactivitylog/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.http.get<ActivityLogModel[]>(url);
  }
  updateMonthlyPlan(data, id) {
    const addUrl = 'updatemonthlyplan/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.post<ActivityLogModel[]>(url, data);
  }
  viewforSingleWorkOrder(workid): Observable<any> {
    const addUrl = 'viewsingleworkorder/';
    const url: string = this.serviceUrl + addUrl + workid;
    return this.http.get<WorkOrder[]>(url);
  }

}
