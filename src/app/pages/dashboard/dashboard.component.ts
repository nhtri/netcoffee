import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: network[] = [];
  month: any
  date: any
  cols: any[];
  trangthaitt: any

  constructor(
    private networkserviceService: NetworkserviceService,
  ) {
    this.trangthaitt = [
      { label: 'All', value: 'all' },
      { label: 'Đã Thanh Toán', value: 'dathanhtoan' },
      { label: 'Chưa Thanh Toán', value: 'chuathanhtoan' }
    ]
  }

  ngOnInit() {
    this.cols = [
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'hoten', header: 'Họ Tên' },
      { field: 'giacuoc', header: 'Giá Cước' },
      { field: 'thangdongcuoc', header: 'Tháng' },

      { field: 'facebook', header: 'Fb' },
      { field: 'thangdongcuoc', header: 'Thanh Toán' },




    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.mawifi != '1'))
    this.date = new Date().getDate()
    if (this.date >= 25) {
      this.month = new Date().getMonth() + 1
      if (new Date().getMonth() + 1 == 1) {
        this.month = 13
      }
    }
    if (this.date < 25) {
      if (new Date().getMonth() == 0) {
        this.month = 12
      }
    }

    console.log(this.date, this.month)
  }
  selectNetWithButton(value) {
    console.log(value)
  }

  isActive(val) {
    if (val > 10) {
      return true
    }
  }

  exportExcel() {

    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "DanhSachKH_SUDUNG");

  }

  saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }


  onchange(value) {
    if(value == 'dathanhtoan'){
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.mawifi != '1' && val.thangdongcuoc>=this.month))
    }
    else if(value == 'chuathanhtoan'){
      this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.mawifi != '1' && val.thangdongcuoc<this.month))
    }
    else if(value == 'all'){
      this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.mawifi != '1' ))

    }
    console.log('value', value)
  }
}
