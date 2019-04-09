import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {CustomerManagementService} from '../../customer-management.service';
import {CustomerData} from './customer.interface';

@Injectable()
export class CustomerResolve implements Resolve<CustomerData[]> {
  constructor(private customerService: CustomerManagementService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<CustomerData[]> {
    return this.customerService.allCustomer();
  }
}
