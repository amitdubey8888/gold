import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable()
export class CommonService {
  
  public display = {
  	loader:false
  }
  
  isLoggedIn:boolean=false;
  
  cartItems:any = [];
  
  cartLength:number;
  
  cartLengthTrue:boolean=false;

  selectedValue = null;

  registerUser = {
    name: '',
    email: '',
    phone: '',
    password: '',
    address1: '',
    address2: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    userId: '',
    token: '',
  };

  constructor(private api: ApiService, private toastr: ToastrService, private user: UserService) {
    if(this.user._token != ''){
      this.getUsers(); 
      this.getCart();
    }
  }
  
  getUsers() {
    const data = {
      _id: this.user._details['_id'],
    };
    this.api.post('users/fetch', data)
      .subscribe(res => {
        this.registerUser = JSON.parse(res['_body']);
        if(this.registerUser[0]._id){
          this.isLoggedIn = true;
        }
      }, err => {
        this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
      });
  }

  getCart() {
    const data = {
      userID: this.user._details['_id'],
    };
    this.api.post('cart/get', data)
	  .subscribe(res => {
	    this.cartItems = JSON.parse(res['_body']);
	    if((this.cartItems).length>=0){
	      this.cartLengthTrue = true;
	      this.cartLength=(this.cartItems).length;
	    }
	  }, err => {
	    this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
	});
  }
}
