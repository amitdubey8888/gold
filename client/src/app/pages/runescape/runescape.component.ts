import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../providers/common.service";

@Component({
  selector: 'app-runescape',
  templateUrl: './runescape.component.html',
  styleUrls: ['./runescape.component.css']
})
export class RunescapeComponent implements OnInit {

  constructor(private common:CommonService) {
      this.common.display.loader = false;
   }

  ngOnInit() {
  }

}
