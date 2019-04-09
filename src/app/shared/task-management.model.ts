import { Time } from "@angular/common";
import { taskProduct } from "./taskProduct.model";

export class TaskModel {
    _id: string;
    userId: string;
    taskNo: string;
    dateTime: Date;
    taskTitle: string;
    taskDescription: string;
   /*  sizeColumn: string;
    imageDetail: string; */
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
    product: [taskProduct];
}
