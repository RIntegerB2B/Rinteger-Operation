import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/task-management.model';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from './../config/appSetting';
import { Observable } from 'rxjs';
import { Register } from './../user-management/registration/register.model';
import { LogIn } from '../shared/login.model';
import { CustomerRegister } from '../user-management/customer-registration/customer-registration.model';
/* import { Customer } from './../customer-management/customer/create-customer/customer.model'; */

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  baseurl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  createTask(data): Observable<any> {
    const urlway = this.baseurl + 'createtask';
    return this.http.post<TaskModel[]>(urlway, data);
  }
  createBssTask(data): Observable<any> {
    const urlway = this.baseurl + 'createtask';
    return this.http.post<TaskModel[]>(urlway, data);
  }
  getAllTaskData(): Observable<any> {
    const urlway = this.baseurl + 'findalltaskdata';
    return this.http.get<TaskModel[]>(urlway);
  }
  UpdateTask(data, id): Observable<any> {
    const url: string = this.baseurl  + 'statusupdate/' + id;
    return this.http.put<TaskModel[]>(url, data);
  }
  EditTask(data, id): Observable<any> {
    const url: string = this.baseurl  + 'updatetask/' + id;
    return this.http.put<TaskModel[]>(url, data);
  }
  getunitwiseTask(name): Observable<TaskModel[]> {
    const urlway = this.baseurl + 'unitwisetask/' + name;
    return this.http.get<TaskModel[]>(urlway);
  }
  deadlinedTask(): Observable<any> {
    const urlway = this.baseurl + 'deadlinedTask';
    return this.http.get<TaskModel[]>(urlway);
  }
  deadlinedTaskByTeamLeader(data): Observable<any> {
    const urlway = this.baseurl + 'deadlinedtaskforteamleader';
    return this.http.post<TaskModel[]>(urlway, data);
  }
  deadlinedTaskByUserID(data): Observable<any> {
    const urlway = this.baseurl + 'deadlinedtaskforuserid';
    return this.http.post<TaskModel[]>(urlway, data);
  }
getRolewisedata(): Observable<any> {
  const urlway = this.baseurl + 'admin/validate';
  return this.http.get<Register[]>(urlway);
}
compareUserId(data): Observable<any> {
  const urlway = this.baseurl + 'finduserid/' + data;
  return this.http.get<TaskModel[]>(urlway);
}
compareUserUnits(data): Observable<any> {
  const urlway = this.baseurl + 'finduserunit/' + data;
  return this.http.get<TaskModel[]>(urlway);
}
getStatusWise(status): Observable<TaskModel[]> {
  const urlway = this.baseurl + 'statusfitler' ;
  return this.http.post<TaskModel[]>(urlway, status);
}
updateRating(rating, id): Observable<TaskModel[]> {
  const urlway = this.baseurl + 'rating/' + id ;
  return this.http.post<TaskModel[]>(urlway, rating);
}
compareUserRole(data): Observable<any> {
  const urlway = this.baseurl + 'finduserroledata/' + data;
  return this.http.get<TaskModel[]>(urlway);
}
getDevelopingData(): Observable<any> {
  const urlway = this.baseurl + 'getdevelopingdata';
  return this.http.get<TaskModel[]>(urlway);
}
getByUserIDDevelopingData(id): Observable<any> {
  const urlway = this.baseurl + 'getbyuseriddevelopingdata/' + id;
  return this.http.get<TaskModel[]>(urlway);
}
createTaskForDevelopting(data): Observable<any> {
  const urlway = this.baseurl + 'createtaskfordeveloping';
  return this.http.post<TaskModel[]>(urlway, data);
}
getDepartmentData(): Observable<any> {
  const urlway = this.baseurl + 'viewdepartments';
  return this.http.get<TaskModel[]>(urlway);
}
getUnitWiseName(): Observable<any> {
  const urlway = this.baseurl + 'unitName';
  return this.http.get<Register[]>(urlway);
}
getSingleData(id): Observable<any> {
  const urlway = this.baseurl + 'findsingle/' + id;
  return this.http.get<TaskModel[]>(urlway);
}
getSelectedTask(id): Observable<TaskModel[]> {
  const urlway = this.baseurl + 'selectedtask/' + id;
  return this.http.get<TaskModel[]>(urlway);
}
UpdateTaskForDeveloping(data, id): Observable<any> {
  const url: string = this.baseurl  + 'statusupdatefordeveloping/' + id;
  return this.http.put<TaskModel[]>(url, data);
}
EditTaskForDeveloping(data, id): Observable<any> {
  const url: string = this.baseurl  + 'edittaskfordeveloping/' + id;
  return this.http.put<TaskModel[]>(url, data);
}
DeleteTask(data): Observable<any> {
  const url: string = this.baseurl + 'deletetask/' + data._id;
  return this.http.delete<TaskModel[]>(url);
}
SendPushNotification(data): Observable<any> {
  const urlway = this.baseurl + 'sendnotificationforstatus';
  return this.http.post<TaskModel[]>(urlway, data);
}
getAllCustomerRegisterer(): Observable<any> {
  const addUrl = 'getallcustomerregistration';
  const url: string = this.baseurl + addUrl ;
  return this.http.get<CustomerRegister>(url);
}
}
