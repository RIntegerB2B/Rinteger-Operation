import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from './../shared/invoice.model';
import { WorkOrder } from './../shared/workorder.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Customer } from './../shared/customer.model';
@Injectable({
  providedIn: 'root'
})

export class InvoiceService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private http: Http, private httpClient: HttpClient) { }
  /* createCustomer(data: any): Observable<any> {
    const addUrl = 'customers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  } */
  
  // all customer details
  createInvoice(row): Observable<any> {
    const addUrl = 'invoice/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Invoice[]>(url, row);
  }
  viewAllInvoice(id): Observable<any> {
    const addUrl = 'viewinvoice/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Invoice[]>(url);
  }
  allAllInvoice(): Observable<any> {
    const addUrl = 'viewallinvoice';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Invoice[]>(url);
  }
  viewSingleInvoice(invid): Observable<any> {
    const addUrl = 'viewsingleinvoice/';
    /* const singleUrl = '/single/'; */
    const url: string = this.serviceUrl + addUrl + invid;
    return this.httpClient.get<Invoice[]>(url);
  }
  updateSingleInvoice(row,  id): Observable<any>  {
    const addUrl = 'invoice/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.put<Invoice[]>(url, row);
  }
  viewSingleWorkOrder(workid): Observable<any> {
    const addUrl = 'viewsingleworkorder/';
    const url: string = this.serviceUrl + addUrl + workid;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  deleteSingleInvoice(invid): Observable<any> {
    const addUrl = 'deleteinvoice/';
    const url: string = this.serviceUrl + addUrl + invid;
    return this.httpClient.delete<Invoice[]>(url);
  }
  workorderPDFDetails(): Observable<any> {
    const addUrl = 'workorderpdfdetails/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  singleCustomerDetails(id): Observable<any> {
    const addUrl = 'customerdetails/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Customer[]>(url);
  }
  invoiceDateSearch(dateSearch): Observable<any> {
    const addUrl = 'invoicedate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Invoice[]>(url, dateSearch);
  }
  invoiceMonthSearch(dateSearch): Observable<any> {
    const addUrl = 'invoicemonth';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Invoice[]>(url, dateSearch);
  }
  setInvoiceStatus(row): Observable<any>   {
    const addUrl = 'invoicestatus/';
    const url: string = this.serviceUrl + addUrl + row.workOrderID;
    return this.httpClient.put<WorkOrder>(url, row);
  }
}
