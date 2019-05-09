import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MarketingManagementService } from '../marketing-management.service';
import { MarketingData } from './marketing.interface';

@Injectable()
export class MarketingResolve implements Resolve<MarketingData[]> {
  constructor(private marketingManagementService: MarketingManagementService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<MarketingData[]> {
    return this.marketingManagementService.getTitle();
  }
}
