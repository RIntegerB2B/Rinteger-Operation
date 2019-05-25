import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  unit;
  menuHide: string;
  getItems: any;
  role: string;
  loginUser: boolean;
  constructor() { }

  makeMenuTrans() {
    this.menuHide = 'menuTransparent';
    this.loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  }

  hideMenuTrans() {
    this.menuHide = '';
    this.loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
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


