import { ActivityMonth } from './activity-month.model';
import { ActivityWeekMonth } from './activity-week.model';
export class ActivityLogModel {
    workOrderID: string;
    customerName: string;
    monthName: string;
    year: string;
    monthlyPlan: [ActivityMonth];
    weeklyPlan: [ActivityWeekMonth];
}
