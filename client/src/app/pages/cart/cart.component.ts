import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "../../providers/common.service";
import { ApiService } from "../../providers/api.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../providers/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  
  gold:string;
  item:string;
  quantity:number = 0;
  amount:number = 0;
  subTotal:number = 0;
  finalPrice:number = 0;
  discount:number = 0;
  total:number = 0;
  reset:number = 0;
  counter:number = 0;
  name:string = '';
  couponName:string = '';
  cartItems:any;
  cartLength:number;
  validCoupon: boolean = false;
  invalidCoupon: boolean = false;
  
  constructor(public common: CommonService,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public user: UserService) { 
    this.common.display.loader = false;    
    if(this.user._token == '' || this.common.isLoggedIn==false){
      this.toastr.error('Please login first.', 'Failed');
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.common.getCart();
    this.getCart();
  }

  getItemName(s:string){
    return ((s).replace(/\s+/g, '')).toUpperCase();
  }

  getCart() {
    const data = {
      userID: this.user._details['_id'],
    };
    this.api.post('cart/get', data)
      .subscribe(res => {
        this.cartItems = JSON.parse(res['_body']);
        this.cartLength = (this.cartItems).length;
        let localTotal:number=0;
        this.cartItems.forEach(function(element) {
          localTotal += (parseInt(element.amount)*parseInt(element.quantity));
        });
        this.reset = localTotal;
        this.subTotal = localTotal;
        this.finalPrice = this.subTotal;
      }, err => {
        this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
      });
  }

  updateValue(){
    let localTotal:number=0;
    this.cartItems.forEach(function(element) {
      localTotal += (parseInt(element.amount)*parseInt(element.quantity));
    });
    this.reset = localTotal;
    this.subTotal = localTotal;
    this.finalPrice = this.subTotal;
  }

  applycoupon(value){
  	if(value>=100 || value<= 1){
  		this.invalidCoupon = true;
  		this.validCoupon = false;
  	}
  	else{
      this.counter = 1;
  		this.invalidCoupon = false;
  		this.validCoupon = true;
  		this.discount = (this.subTotal*value)/100;
  		this.finalPrice = this.finalPrice - this.discount;
  	}
  }
  resetcoupon(){
    this.subTotal = this.reset;
    this.discount = 0;
    this.finalPrice = this.subTotal;
    this.counter = 0;
    this.couponName = '';
    this.invalidCoupon = false;
    this.validCoupon = false;
  }

  checkout(){
    let that = this;
    this.common.display.loader = true;    
    let dataFinal:any=[];
    let finalSubtotal = this.subTotal;
    let finalDiscount = this.discount;
    let finalTotal = this.finalPrice;
    let success:number=0;
    this.cartItems.forEach(function(element) {
      success++;
      let data = {
        gold: element.gold,
        rsName: element.rsName,
        amount : element.amount,
        quantity: element.quantity,
        userID: that.user._details['_id'],
        _id: element._id
      };
      dataFinal.push(data);
    });
    if(success==(this.cartItems).length){
      dataFinal.push({subtotal:finalSubtotal,discount:finalDiscount,final:finalTotal});
      this.common.selectedValue = dataFinal;
      this.router.navigate(['checkout']);
    }
  }

  continue(){
    this.router.navigate(['home']);
  }

}
