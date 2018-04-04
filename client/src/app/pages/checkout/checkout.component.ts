import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "../../providers/common.service";
import { ApiService } from "../../providers/api.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../providers/user.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  name: string;
  price: number;
  quantity: number;

  gold:string;
  item:string;
  getUser:any;
  address:any;
  checkoutItem:any=[];
  checkoutPrice:any = {
    discount:'',
    subtotal:'',
    final:''
  };
  
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
    if(this.common.selectedValue==null || this.common.cartLength==0){
      this.router.navigate(['cart']);
    }
  }

  ngOnInit() {
    if (this.common.selectedValue != null) {
      let localItem = this.common.selectedValue;
      this.checkoutPrice = (localItem).pop();
      this.checkoutItem = localItem;
    }
    else{
      this.getCart();
    }
    if(this.user._token != ''){
      this.getUsers(); 
      this.common.getCart();
    }
  }
  getCart() {
    let that = this;
    const data = {
      userID: this.user._details['_id'],
    };
    this.api.post('cart/get', data)
      .subscribe(res => {
        let localTotal:number=0;
        JSON.parse(res['_body']).forEach(function(element) {
          localTotal += (parseInt(element.amount)*parseInt(element.quantity));
          that.checkoutItem.push(element);
        });
        let data = {
          subtotal:localTotal,
          discount:0,
          final:localTotal
        };
        this.checkoutPrice=data;
      }, err => {
        this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
      });
  }
  getItemName(s:string){
    return ((s).replace(/\s+/g, '')).toUpperCase();
  }

  getUsers() {
    const data = {
      _id: this.user._details['_id'],
    };
    this.api.post('users/fetch', data)
      .subscribe(res => {
        this.getUser = JSON.parse(res['_body']);
        this.address = this.getUser[0].name+', '+this.getUser[0].address1+', '+this.getUser[0].address2+', '+this.getUser[0].city+', '+this.getUser[0].state+', '+this.getUser[0].country+', Pin-'+this.getUser[0].pincode;
        }, 
      err => {
        this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
      });
  }
  profile(){
    this.router.navigate(['profile']);
  }

  checkout(){
    let that = this;
    this.common.display.loader = true;
    let success:number=0;

    this.checkoutItem.forEach(function(item){
      let data ={
        quantity: item.quantity,
        amount: item.amount,
        rsName: item.rsName,
        gold: item.gold,
        userID: item.userID,
        itemID: item._id,
        discount: that.checkoutPrice.discount,
        subtotal: that.checkoutPrice.subtotal,
        final: that.checkoutPrice.final,
      };
      // Buy Item & Add to Order Start 
      that.api.post('order/add', data)
      .subscribe(res => {
          success++;
          if(success==(that.checkoutItem).length){
            that.common.getCart();
            that.toastr.success('Order placed successfully.', 'Success !');
            that.common.selectedValue = null;
            that.common.display.loader = false;
            that.router.navigate(['profile']);
          }
        }, 
      err => {
        that.toastr.error(JSON.parse(err['_body']).message, 'Error !');
        that.common.display.loader = false;
      });
      // Buy Item & Add to Order End 

      // Remove Item From Cart Start
      that.api.post('cart/delete', {id:item._id})
      .subscribe(res => {}, 
      err => {
        that.toastr.error(JSON.parse(err['_body']).message, 'Error !');
      });
      // Remove Item From Cart End
    });
  }
}
