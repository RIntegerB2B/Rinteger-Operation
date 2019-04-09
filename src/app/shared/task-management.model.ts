import { Time } from '@angular/common';
import { TaskProduct } from './taskProduct.model';
import { TaskModule } from './taskModule.model';
import { TaskShoot } from './taskShoot.model';
import { TaskList } from './taskList.model';
export class TaskModel {
    _id: string;
    userId: string;
    clientName: string;
    taskNo: string;
    dateTime: Date;
    taskTitle: string;
    taskDescription: string;
    priority: string;
    units: string;
    department: string;
    assignedTo: string;
    assignedBy: string;
    status: string;
    toCloseDate: Date;
    toTime: string;
    closedDate: Date;
    time: string;
    comment: string;
    product: [TaskProduct];
    task: [TaskModule];
    shoot: [TaskShoot];
    list: [TaskList];
}
