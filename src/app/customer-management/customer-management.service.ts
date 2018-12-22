import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './../customer-management/create-customer/customer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http: Http, private httpClient: HttpClient) { }
  allCustomer(): Observable<any> {
    const addUrl = 'viewcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  addSingleCustomer(data: any): Observable<any> {
    const addUrl = 'addcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  }
  editCustomer(edit): Observable<any> {
    const addUrl = 'customer/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Customer[]>(url, edit);
  }
  deleteCustomer(edit): Observable<any> {

    const addUrl = 'customer/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Customer[]>(url);
  }
  singleCustomer(id): Observable<any> {

    const addUrl = 'singlecustomer/';

    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Customer[]>(url);
  }
}
