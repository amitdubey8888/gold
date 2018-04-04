import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  _token = '';
  _details = null;
  
  constructor() { 
  	this._token = localStorage.getItem('TOKEN') || '';
    this._details = JSON.parse(localStorage.getItem('USER_DETAILS')) || null;
  }

}
