import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",

})
export class DashboardComponent implements OnInit {
  data: network[] = [];
month:any
date:any
  cols: any[];
  constructor(
    private networkserviceService: NetworkserviceService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'hoten', header: 'Họ Tên' },      
      { field: 'giacuoc', header: 'Giá Cước' },
      { field: 'thangdongcuoc', header: 'Tháng' },
      
      { field: 'facebook', header: 'Fb' },
      { field: 'thangdongcuoc', header: 'Thanh Toan' },

    


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val=>val.hoten!=null && val.hoten!=''))
this.date = new Date().getDate()
if(this.date >= 25){
  this.month = new Date().getMonth() + 1
  if(new Date().getMonth() + 1 == 1)
  {
    this.month = 13
  }
}


console.log(this.date ,this.month)
  }
  selectNetWithButton(value) {
    console.log(value)
  }

  isActive(val) {
    if (val >10) {
      return true
    }
  }
}
