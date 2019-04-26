import { AssetListQuantity } from './asset-list-quantity.model';

export class AssetListingModel {
    date: string;
    productName: string;
    responsePerson: string;
    verifiedBy: string;
    department: string;
    availableStatus: string;
    productPrice: number;
    purchaseQuantitiy: number;
    Description: string;
    availableQuantitiy: number;
    availability: [AssetListQuantity];
    imageName: string;
    imagePath: string;
    image: File;
}
