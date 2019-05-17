import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Register } from './registration/register.model';
import {  UserPermission } from './../shared/userPermission.model';
import {  LeadSettings } from './../shared/lead-settings.model';
import { CustomerRegister } from './customer-registration/customer-registration.model';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }
  registration(data: Register) {
    const addUrl = 'register';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Register>(url, data);
  }
  CustomerRegistration(data: CustomerRegister) {
    const addUrl = 'customerregister';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<CustomerRegister[]>(url, data);
  }
  allRegister(): Observable<any> {
    const addUrl = 'allregister';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Register[]>(url);
  }
  permissionUsers(data: UserPermission): Observable<any> {
    const addUrl = 'createrole';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<UserPermission>(url, data);
  }
  leadSource(): Observable<any> {
    const addUrl = 'leadsources';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<LeadSettings[]>(url);
  }
  permissionRole(): Observable<any>  {
    const addUrl = 'allroles';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<UserPermission[]>(url);
  }
  permissionRoleForEdit(): Observable<any>  {
    const addUrl = 'allrolesforedit';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<UserPermission[]>(url);
  }
  updateRole(data, value): Observable<any> {
    const addUrl = 'update/';
    const url: string = this.serviceUrl + addUrl + value;
    return this.httpClient.put<UserPermission[]>(url, data);
  }
  DeleteRole(data): Observable<any> {
    const url: string = this.serviceUrl + 'deleterole/' + data;
    return this.httpClient.delete<UserPermission[]>(url);
  }
  DeleteRegisteredUser(data): Observable<any> {
    const url: string = this.serviceUrl + 'deleteregistereduser/' + data;
    return this.httpClient.delete<Register[]>(url);
  }
  SelectedRegisteredUser(id): Observable<any> {
    const addUrl = 'editregistereduser/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Register[]>(url);
  }
  updateRegisteredUser(data): Observable<any> {
    const addUrl = 'updateregistereduser/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.post<Register>(url, data);
  }
  getAllCustomerRegistration(): Observable<any> {
    const addUrl = 'getallcustomerregistration';
    const url: string = this.serviceUrl + addUrl ;
    return this.httpClient.get<CustomerRegister>(url);
  }
  SelectedRegisteredCustomer(id): Observable<any> {
    const addUrl = 'editregisteredcustomer/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<CustomerRegister[]>(url);
  }
  updateRegisteredCustomer(data): Observable<any> {
    const addUrl = 'updateregisteredcustomer/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.post<CustomerRegister>(url, data);
  }
  DeleteRegisteredCustomer(data): Observable<any> {
    const url: string = this.serviceUrl + 'deleteregisteredcustomer/' + data;
    return this.httpClient.delete<CustomerRegister[]>(url);
  }
}
