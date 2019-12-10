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
      { field: 'MaWiFi', header: 'Mã WiFi' },
      { field: 'SDTSim', header: 'SDT Sim' },
      { field: 'MaSim', header: 'Mã Sim' },
      { field: 'GiaCuoc', header: 'Giá Cước' },
      { field: 'ThangDongCuoc', header: 'Tháng' },
      { field: 'TrangThai', header: 'Trạng Thái' },


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
