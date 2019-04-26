import { Component, OnInit, Input } from '@angular/core';
import { AssetListingModel } from '../../shared/asset-listing.model';

@Component({
  selector: 'app-view-availabiliy',
  templateUrl: './view-availabiliy.component.html',
  styleUrls: ['./view-availabiliy.component.css']
})
export class ViewAvailabiliyComponent implements OnInit {
  @Input() assetData: AssetListingModel;
  constructor() { }

  ngOnInit() {
  }

}
