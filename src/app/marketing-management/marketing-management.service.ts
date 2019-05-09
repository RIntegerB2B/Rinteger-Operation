import { Injectable } from '@angular/core';
import { MarketingManagementModel } from '../shared/marketing-management.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketingSetting } from '../shared/marketing-setting.model';
/* import { MarketingData } from './view-all-marketing/marketing.interface'; */

@Injectable({
  providedIn: 'root'
})
export class MarketingManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }
  CreateTitle(data): Observable<any> {
    const addUrl = 'createtitle';
    const url: string = this.serviceUrl + addUrl;
    return this.http.post<MarketingManagementModel[]>(url, data);
  }
  getTitle(): Observable<any> {
    const addUrl = 'gettitle';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<MarketingManagementModel[]>(url);
  }
  getSelectedTitle(id): Observable<any> {
    const addUrl = 'getselectedtitle/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.get<MarketingManagementModel[]>(url);
  }
  CreateCompanyDetail(data, id): Observable<any> {
    const addUrl = 'createcompanydetail/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.post<MarketingManagementModel[]>(url, data);
  }
  findByLocation(data): Observable<any> {
    const addUrl = 'findlocation';
    const url: string = this.serviceUrl + addUrl;
    return this.http.post<MarketingManagementModel[]>(url, data);
  }
  findBySubCategory(data): Observable<any> {
    const addUrl = 'findsubcategory';
    const url: string = this.serviceUrl + addUrl;
    return this.http.post<MarketingManagementModel[]>(url, data);
  }
  findByCategory(data): Observable<any> {
    const addUrl = 'findcategory';
    const url: string = this.serviceUrl + addUrl;
    return this.http.post<MarketingManagementModel[]>(url, data);
  }
  addBulkUpload(data, id): Observable<any> {
    const addUrl = 'bulkupload/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.post<MarketingManagementModel[]>(url, data);
  }
  getSelectedCompany(id): Observable<any> {
    const addUrl = 'selectedcompany/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.get<MarketingManagementModel[]>(url);
}
updateCompanyDetail(data, id): Observable<any> {
  const addUrl = 'updatecompanydetail/';
  const url: string = this.serviceUrl + addUrl + id;
  return this.http.post<MarketingManagementModel[]>(url, data);
}
updateTitle(data, id): Observable<any> {
  const addUrl = 'updatetitle/';
  const url: string = this.serviceUrl + addUrl + id;
  return this.http.post<MarketingManagementModel[]>(url, data);
}
addActivity(data, id): Observable<any> {
  const addUrl = 'addactivity/';
  const url: string = this.serviceUrl + addUrl + id;
  return this.http.post<MarketingManagementModel[]>(url, data);
}
deleteSelectedlist(id): Observable<any> {
  const addUrl = 'deleteselectedlist/';
  const url: string = this.serviceUrl + addUrl + id;
  return this.http.delete<MarketingManagementModel[]>(url);
}
deleteSelectedActivity(id): Observable<any> {
  const addUrl = 'deleteselectedActivity/';
  const url: string = this.serviceUrl + addUrl + id;
  return this.http.delete<MarketingManagementModel[]>(url);
}
deleteSelectedTitle(id): Observable<any> {
  const addUrl = 'deleteselectedtitle/';
  const url: string = this.serviceUrl + addUrl + id;
  return this.http.delete<MarketingManagementModel[]>(url);
}
getSetting(): Observable<any> {
  const addUrl = 'viewmarketingsetting';
  const url: string = this.serviceUrl + addUrl;
  return this.http.get<MarketingSetting[]>(url);
}
/* getAllmarketing(): Observable<any> {
  const addUrl = 'getmarketing';
  const url: string = this.serviceUrl + addUrl;
  return this.http.get<MarketingManagementModel[]>(url);
} */
}
