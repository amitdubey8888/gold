import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../providers/common.service";

@Component({
  selector: 'app-bulkorder',
  templateUrl: './bulkorder.component.html',
  styleUrls: ['./bulkorder.component.css']
})
export class BulkorderComponent implements OnInit {

  constructor(private common: CommonService) { 
      this.common.display.loader = false;
  }

  ngOnInit() {
  }

}
