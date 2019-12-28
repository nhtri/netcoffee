import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",

})
export class DashboardComponent implements OnInit {
  data: network[] = [];

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
      { field: 'facebook', header: 'Facebook' },

    


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val)



  }
  selectNetWithButton(value) {
    console.log(value)
  }

  isActive(val) {
    if (val == 0) {
      '<span><i class="fa fa-circle icon icon-green"></i></span>'
    }
  }
}
