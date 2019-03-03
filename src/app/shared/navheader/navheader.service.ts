import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavheaderService {

  menuHide: string;
  constructor() { }

  makeMenuTrans()   {
    this.menuHide = 'menuTransparent';
  }

  hideMenuTrans()   {
    this.menuHide = '';
  }
}
