import { Time } from '@angular/common';
import { TaskProduct } from './taskProduct.model';
import { TaskModule } from './taskModule.model';
import { TaskShoot } from './taskShoot.model';
import { TaskList } from './taskList.model';
import { TaskMarketing } from './taskMarketing.model';
export class TaskModel {
    _id: string;
    userId: string;
    clientName: string;
    taskNo: string;
    dateTime: string;
    taskTitle: string;
    taskDescription: string;
   /*  sizeColumn: string;
    imageDetail: string; */
    priority: string;
    weekID: string;
    units: string;
    role: string;
    rating: number;
    department: string;
    assignedTo: string;
    assignedBy: string;
    status: string;
    toCloseDate: Date;
    toTime: string;
    closedDate: Date;
    time: string;
    comment: string;
    leaderComment: string;
    product: [TaskProduct];
    task: [TaskModule];
    shoot: [TaskShoot];
    list: [TaskList];
    marketing: [TaskMarketing];
}
