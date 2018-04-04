import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../providers/common.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private common:CommonService) {
      this.common.display.loader = false;
   }

  ngOnInit() {
  }
}
