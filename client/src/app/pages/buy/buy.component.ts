import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from "../../providers/common.service";
import { ApiService } from "../../providers/api.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../providers/user.service";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  home:string;
  id:string;
  quantity:number = 1;
  amount:number = 1;
  rsName:string = '';

  constructor(public common: CommonService,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public user: UserService) {
    this.common.display.loader = false;
    if(this.user._token == '' || this.common.isLoggedIn==false){
      this.toastr.error('Please login first.', 'Failed');
      this.router.navigate(['home']);
      if (!this.common.selectedValue) {
        this.router.navigate(['home']);
      }
    }
  }

  ngOnInit() {
    if (this.common.selectedValue) {
      this.home = this.common.selectedValue.value;
      this.id = this.common.selectedValue.id;
    }
    this.common.getCart();
  }

  buy(value: any) {
    this.common.display.loader = true;
    let cartItem = {
      quantity:value['quantity'],
      amount:value['amount'],
      rsName:value['rsName'],
      gold:this.id+' Gold',
      userID: this.user._details['_id']
    }
    this.api.post('cart/add', cartItem).subscribe(res => {
      this.common.getCart();
      this.toastr.success('Item has been added to your cart.', 'Success !');
      this.router.navigate(['cart']);
      this.common.display.loader = false;
    }, err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Failed !');
      this.common.display.loader = false;
    });
  }
}
