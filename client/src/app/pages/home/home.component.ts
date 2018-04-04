import { Component } from '@angular/core';
import { CommonService } from '../../providers/common.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {

	constructor(public common: CommonService){}
	
	ngOnInit() {
  	}
}

