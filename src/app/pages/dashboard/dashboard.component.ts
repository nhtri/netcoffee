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

    


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val=>val.hoten!=null))


  }
  selectNetWithButton(value) {
    console.log(value)
  }

  
}
