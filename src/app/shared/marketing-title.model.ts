import {MarketingActivity} from './marketing-activity.model';

export class MarketingTitleModel {
    name: string;
    mobileNumber: string;
    emailID: string;
    remark: string;
    status: string;
    address: string;
    activity: [MarketingActivity];
  }
