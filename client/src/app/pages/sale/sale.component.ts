import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../providers/common.service";
import { ApiService } from "../../providers/api.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../providers/user.service";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  home:string;
  id:string;
  constructor(public common: CommonService,
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public user: UserService) {
      this.common.display.loader = false;
    }

  ngOnInit() {
  	if (this.common.selectedValue) {
		this.home = this.common.selectedValue.value;
		this.id = this.common.selectedValue.id;
    }
    else{
      this.router.navigate(['home']);
    }
  }

}
