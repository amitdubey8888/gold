import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords, numberValidator } from '../../validator/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from "../../providers/common.service";
import { ApiService } from "../../providers/api.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../providers/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  dashboardValue:boolean=true;
  myorderValue:boolean=false;
  profileValue:boolean=false;
  changeValue:boolean=false;

  profileForm: FormGroup;
  editUser = {
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
  changepasswordForm: FormGroup;

  myOrders:any=[];
  myLastOrder:any=[];

  constructor(
    public fb: FormBuilder,
    public common: CommonService,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public user: UserService) {
    this.profileForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.compose([Validators.required, numberValidator])],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      pincode: ['', Validators.compose([Validators.required, numberValidator])],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.changepasswordForm = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'confirmPassword')});
    
    if(this.user._token == '' || this.common.isLoggedIn==false){
      this.toastr.error('Please login first.', 'Failed');
      this.router.navigate(['home']);
    }
  }
  ngOnInit() {
    if(this.user._token != ''){
      this.getUsers(); 
      this.getOrder();
    }
  }

  getUsers() {
    const data = {
      _id: this.user._details['_id'],
    };
    this.api.post('users/fetch', data)
    .subscribe(res => {
      this.editUser = (JSON.parse(res['_body']))[0];
    }, 
    err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
    });
  }

  getOrder(){
    const data = {
      userID: this.user._details['_id'],
    };
    this.api.post('order/get',data)
    .subscribe(res => {
      this.myOrders = JSON.parse(res['_body']);
      this.myLastOrder.push((JSON.parse(res['_body'])).pop());
      }, 
    err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Error !');
    });
  }

  updateProfile(value: Object): void {
      this.common.display.loader = true;
      let updateUser = {
      name: value['name'],
      email: value['email'],
      phone: value['phone'],
      address1: value['address1'],
      address2: value['address2'],
      pincode: value['pincode'],
      city: value['city'],
      state: value['state'],
      country: value['country'],
      id: this.user._details['_id'],
      token: this.user._token,
    };
    this.api.post('users/update', updateUser).subscribe(res => {
      this.user._token = JSON.parse(res['_body']).token;
      this.user._details = JSON.parse(res['_body']).data;
      localStorage.setItem('TOKEN', this.user._token);
      localStorage.setItem('USER_DETAILS', JSON.stringify(this.user._details));
      this.getUsers();
      this.toastr.success('Your profile has been updated.', 'Success !'); 
      this.common.display.loader = false;
    }, err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Failed !');
      this.common.display.loader = false;
    });
  }

  changePassword(value: Object): void {
    this.common.display.loader = true;
    let updatePassword = {
      newPassword: value['password'],
      id: this.user._details['_id'],
      token: this.user._token,
    };
    this.api.post('users/change-password', updatePassword).subscribe(res => {
      this.toastr.success('Your password has been changed.', 'Success !'); 
      this.common.display.loader = false;
    }, err => {
      this.toastr.error(JSON.parse(err['_body']).message, 'Failed !');
      this.common.display.loader = false;
    });
  }

  dashboard(){
    this.dashboardValue=true;
    this.myorderValue=false;
    this.profileValue=false;
    this.changeValue=false;
  }
  myorder(){
    this.dashboardValue=false;
    this.myorderValue=true;
    this.profileValue=false;
    this.changeValue=false;
  }
  profile(){
    this.dashboardValue=false;
    this.myorderValue=false;
    this.profileValue=true;
    this.changeValue=false;
  }
  changepassword(){
    this.dashboardValue=false;
    this.myorderValue=false;
    this.profileValue=false;
    this.changeValue=true;
  }
  logout(){
    localStorage.clear();
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER_DETAILS');
    this.common.cartLengthTrue=false;
    this.common.isLoggedIn=false;
    this.toastr.success('Your have logged out successfully.', 'Success !'); 
    this.router.navigate(['home']);
  }
}
