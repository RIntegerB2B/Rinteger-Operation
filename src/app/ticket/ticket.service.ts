import { Injectable } from '@angular/core';
import { TicketModel } from './ticket/ticket.Model';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from './../config/appSetting';
import { Observable } from 'rxjs';
import { Customer } from './../customer-management/customer/create-customer/customer.model';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketholder: TicketModel[];
  baseurl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }


  getfieldValue(ticketholder): Observable<TicketModel> {
    const urlway = this.baseurl + 'createticket';

    return this.http.post<TicketModel>(urlway, ticketholder);
  }

  retriveTicket(): Observable<TicketModel[]> {
    const urlway = this.baseurl + 'retriveticket';

    return this.http.get<TicketModel[]>(urlway);
  }

  getDepartment(): Observable<TicketModel> {
    const urlway = this.baseurl + 'departments';

    return this.http.get<TicketModel>(urlway);
  }


  uniqTicket(id): Observable<TicketModel> {
    const urlway = this.baseurl + 'unique/' + id;
    return this.http.get<TicketModel>(urlway);
  }

  allCustomer(): Observable<any> {
    const addUrl = 'viewcustomer';
    const url: string = this.baseurl + addUrl;
    return this.http.get<Customer[]>(url);
  }

  getStudioTicket(): Observable<TicketModel> {
    const urlway = this.baseurl + 'studioticket';

    return this.http.get<TicketModel>(urlway);
  }

  getBssTicket(): Observable<TicketModel> {
    const urlway = this.baseurl + 'bssticket';

    return this.http.get<TicketModel>(urlway);
  }

  getTechTicket(): Observable<TicketModel> {
    const urlway = this.baseurl + 'techticket';

    return this.http.get<TicketModel>(urlway);
  }

}
