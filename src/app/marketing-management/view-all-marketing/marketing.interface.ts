import { MarketingTitleModel } from '../../shared/marketing-title.model';
export interface MarketingData {
    category: string;
    subCategory: string;
    location: string;
    title: string;
    companyDetail: [MarketingTitleModel];
}
