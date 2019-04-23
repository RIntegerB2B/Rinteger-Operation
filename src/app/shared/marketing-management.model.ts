import { MarketingTitleModel } from './marketing-title.model';

export class MarketingManagementModel {
  category: string;
  subCategory: string;
  location: string;
  title: string;
  companyDetail: [MarketingTitleModel];
}
