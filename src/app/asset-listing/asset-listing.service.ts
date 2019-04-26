import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssetListingModel } from './../shared/asset-listing.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AssetData } from './view-all-asset-listing/asset.interface';
import { AssetListingSettingModel } from '../shared/asset-listing-setting.model';

@Injectable({
  providedIn: 'root'
})
export class AssetListingService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }
  createAsset(data): Observable<any> {
    const addUrl = 'createasset';
    const url: string = this.serviceUrl + addUrl;
    return this.http.post<AssetListingModel[]>(url, data);
  }

  getAllAssetList(): Observable<any> {
    const addUrl = 'getallassetlist';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<AssetData[]>(url).pipe();
  }
  getSelectedAsset(id): Observable<any> {
    const addUrl = 'getselectedasset/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.get<AssetListingModel[]>(url);
  }
  updateAsset(data, id): Observable<any> {
    const addUrl = 'updateasset/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.post<AssetListingModel[]>(url, data);
  }
  reEditAsset(data, id): Observable<any> {
    const addUrl = 'reedit/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.post<AssetListingModel[]>(url, data);
  }
  deleteAsset(id): Observable<any> {
    const addUrl = 'deleteasset/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.http.delete<AssetListingModel[]>(url);
  }
  getAssetSetting(): Observable<any> {
    const addUrl = 'viewassetsetting';
    const url: string = this.serviceUrl + addUrl;
    return this.http.get<AssetListingSettingModel[]>(url);
  }

  // image upload
  uploadImages(data, assetId): Observable<any> {
    const addUrl = 'productimages/';
    const url: string = this.serviceUrl + addUrl + assetId ;
    return this.http.put<boolean>(url, data);
  }
}
