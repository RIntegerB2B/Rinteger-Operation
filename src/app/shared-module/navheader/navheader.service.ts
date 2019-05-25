import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavheaderService {
  unit;
  menuHide: string;
  getItems: any;
  role: string;
  loginUser: boolean;
  constructor() {
  }

  makeMenuTrans() {
    this.menuHide = 'menuTransparent';
  }

  hideMenuTrans() {
    this.menuHide = '';
  }
  menuItems() {
    this.getItems = JSON.parse(sessionStorage.getItem('menus'));
  }
  getUnit() {
       return sessionStorage.getItem('unit');
      }
      getRole() {
        return sessionStorage.getItem('role');
      }
}
