import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllAssetListingComponent } from './view-all-asset-listing/view-all-asset-listing.component';
import { CreateAssetListingComponent } from './create-asset-listing/create-asset-listing.component';
import { ViewSingleComponent } from './view-single/view-single.component';
import { EditAssetListingComponent } from './edit-asset-listing/edit-asset-listing.component';
import { UpdateAssetListingComponent } from './update-asset-listing/update-asset-listing.component';
import { AssetResolve } from './view-all-asset-listing/asset.resolve';
const routes: Routes = [
  {
    path: 'view-all',
    component: ViewAllAssetListingComponent,
    resolve: {
      asset: AssetResolve
    }
  },
  {
    path: 'create-asset-list',
    component: CreateAssetListingComponent
  },
  {
    path: 'view-single/:id',
    component: ViewSingleComponent
  },
  {
    path: 'edit-asset/:id',
    component: EditAssetListingComponent
  },
  {
    path: 'update-asset/:id',
    component: UpdateAssetListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AssetResolve]
})
export class AssetListingRoutingModule { }

