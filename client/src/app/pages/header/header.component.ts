import { Component , OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '../../providers/country.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { emailValidator, matchingPasswords, numberValidator } from '../../validator/validator';
import { ApiService } from '../../providers/api.service';
import { CommonService } from '../../providers/common.service';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  modalLogin: any;
  modalCart:any;
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
  loginValue = true;
  signupValue = false;
  forgotValue = false;
  country_name: any;
  loggedInUser:any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotForm: FormGroup;
  constructor(
    private countryService: CountryService, 
    config: NgbCarouselConfig, 
    private modalService: NgbModal, 
    private router: Router,
    public fb: FormBuilder,
    public common: CommonService,
    private api: ApiService,
    private toastr: ToastrService,
    public user: UserService) {
    config.interval = 3000;
    config.wrap = false;
    config.keyboard = false;
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
    });
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.compose([Validators.required, numberValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      pincode: ['', Validators.compose([Validators.required, numberValidator])],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')});
    this.forgotForm = fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
    });
    if(this.user._token != ''){
      this.common.getUsers();
      this.common.getCart();
    }
  }

  ngOnInit() {}

  openLoginModal(Modal) {
    this.modalLogin = this.modalService.open(Modal);
  }
  openCartModal(Modal){
    this.common.getCart();
    this.modalCart = this.modalService.open(Modal, { windowClass: 'dark-modal' });
  }

  getItemName(s:string){
    return ((s).replace(/\s+/g, '')).toUpperCase();
  }

  checkoutCart(){
    this.common.getCart();
    this.router.navigate(['checkout']);
    this.modalCart.close();
  }

  updateCart(){
    this.common.display.loader =  true; 
    let success=0, error=0;
    let that = this;
    this.common.cartItems.forEach(function(element) {
      let cartItem = {
        quantity:element.quantity,
        amount:element.amount,
        rsName:element.rsName,
        gold:element.gold,
        userID:element.userID,
        id:element._id
      }
      that.api.post('cart/update', cartItem).subscribe(res => {
        success++;
        that.common.getCart();
        if(success == (that.common.cartItems).length)
        {
          that.toastr.success('Item has been updated in your cart.', 'Success !');
          that.common.display.loader =  false; 
        }
      }, err => {
        error++;
        if(error>0)
        {
          that.toastr.error('There is some problem. Please try again.', 'Failed !');
          that.common.display.loader =  false;
        }
      });
    });
  }
  deleteCart(value:any){
    this.common.display.loader =  true;
    const data = {
      id: value
    };
    this.api.post('cart/delete', data)
      .subscribe(res => {
        this.common.getCart();
        this.toastr.success('Item has been removed from your cart.', 'Success !');
        this.common.display.loader =  false;
      }, err => {
        this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
        this.common.display.loader =  false;
    });
  }
  
  register(value: Object): void{
    this.common.display.loader =  true;
    this.registerUser = {
      name: value['name'],
      email: value['email'],
      phone: value['phone'],
      password: value['password'],
      address1: value['address1'],
      address2: value['address2'],
      pincode: value['pincode'],
      city: value['city'],
      state: value['state'],
      country: value['country'],
      userId: '',
      token: '',
    };
    this.api.post('users/signup', this.registerUser).subscribe(res => {
      this.user._token = JSON.parse(res['_body']).token;
      this.user._details = JSON.parse(res['_body']).data;
      localStorage.setItem('TOKEN', this.user._token);
      localStorage.setItem('USER_DETAILS', JSON.stringify(this.user._details));
      this.common.getUsers();
      this.common.getCart();
      this.modalLogin.close();
      this.toastr.success('Signup successful.', 'Success !');
      this.common.display.loader =  false;
    }, err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Failed !');
      this.common.display.loader =  false;
    });
  }

  login(value: Object): void{
    this.common.display.loader =  true;
    let loginUser = {
      email: value['email'],
      password: value['password'],
    };
    this.api.post('users/login', loginUser)
    .subscribe(res => {
      this.user._token = JSON.parse(res['_body']).token;
      this.user._details = JSON.parse(res['_body']).data;
      localStorage.setItem('TOKEN', this.user._token);
      localStorage.setItem('USER_DETAILS', JSON.stringify(this.user._details));
      this.common.getUsers();
      this.common.getCart();
      this.modalLogin.close();
      this.toastr.success('Login successful.', 'Success !');
      this.common.display.loader =  false;
    }, err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
      this.common.display.loader =  false;
    });
  }
  logModal() {
    this.loginValue = true;
    this.signupValue = false;
    this.forgotValue = false;
  }
  regModal() {
    this.loginValue = false;
    this.signupValue = true;
    this.forgotValue = false;
  }
  forgotModal() {
    this.loginValue = false;
    this.signupValue = false;
    this.forgotValue = true;
  }
  forgot(value: Object): void{
    console.log(value);
    this.modalLogin.close();
  }
 
  buyRS3(value){
    this.common.display.loader = true;  
    let data = {
      value:value,
      id:"RS 3"
    }
    this.common.selectedValue = data;
    this.router.navigate(['buy']);
  }
  saleRS3(value){
    this.common.display.loader = true;  
    let data = {
      value:value,
      id:"RS3"
    }
    this.common.selectedValue = data;
    this.router.navigate(['sale']);
  }
  buyRS2007(value){
    this.common.display.loader = true;  
    let data = {
      value:value,
      id:"RS 2007"
    }
    this.common.selectedValue = data;
    this.router.navigate(['buy']);  }
  saleRS2007(value){
    this.common.display.loader = true;  
    let data = {
      value:value,
      id:"RS2007"
    }
    this.common.selectedValue = data;

    this.router.navigate(['sale']);
  }
  keyCSGO(value){
    this.common.display.loader = true;  
    let data = {
      value:value,
      id:"KEYS"
    }
    this.common.selectedValue = data;
    this.router.navigate(['buy']);
  }
  skinCSGO(value){
    this.common.display.loader = true;  
    let data = {
      value:value,
      id:"SKINS"
    }
    this.common.selectedValue = data;
    this.router.navigate(['sale']);
  }
}
