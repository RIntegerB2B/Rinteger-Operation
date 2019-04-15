import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavheaderService {
  unit;
  menuHide: string;
  getItems: any;
  role: string;
  constructor() {
  }

  makeMenuTrans() {
    this.menuHide = 'menuTransparent';
  }

  hideMenuTrans() {
    this.menuHide = '';
  }
  menuItems() {
    this.getItems = JSON.parse(localStorage.getItem('menus'));
  }
  getUnit() {
       return localStorage.getItem('unit');
      }
      getRole() {
        return localStorage.getItem('role');
      }
}
