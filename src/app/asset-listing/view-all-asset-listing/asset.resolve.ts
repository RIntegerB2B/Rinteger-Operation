import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AssetListingService } from '../asset-listing.service';
import { AssetData } from './asset.interface';

@Injectable()
export class AssetResolve implements Resolve<AssetData[]> {
  constructor(private assetListingService: AssetListingService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<AssetData[]> {
    return this.assetListingService.getAllAssetList();
  }
}
