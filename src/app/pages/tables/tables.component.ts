import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  data: network[] = [];
 
  cols: any[];
  constructor(
    private networkserviceService: NetworkserviceService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'hoten', header: 'Họ Tên' },
      { field: 'facebook', header: 'FaceBook' },
      {field: 'diachi', header: 'Địa Chỉ' }
   


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => val.mawifi == '1' && val.trangthai_kh =='huy'))
    // this.dskhhuy = this.data.map(({ hoten, facebook,diachi }) => ({hoten, facebook,diachi}));


  }
  selectNetWithButton(value) {
    console.log(value)
  }

  isActive(val) {
    if (val == true) {
      '<span><i class="fa fa-circle icon icon-green"></i></span>'
    }
  }

  exportExcel() {
  
        const worksheet = XLSX.utils.json_to_sheet(this.data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "DanhSachKH_HUY");
  
}

saveAsExcelFile(buffer: any, fileName: string): void {
 
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  
}
}