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
      { field: 'MaWiFi', header: 'Mã WiFi' },
      { field: 'SDTSim', header: 'SDT Sim' },
      { field: 'MaSim', header: 'Mã Sim' },
      { field: 'GiaCuoc', header: 'Giá Cước' },
      { field: 'ThangDongCuoc', header: 'Tháng' },
      { field: 'TrangThai', header: 'Trạng Thái' },


    ];
    this.networkserviceService.getOldWiFi().subscribe(val => this.data = val)



  }
  selectNetWithButton(value) {
    console.log(value)
  }

  isActive(val) {
    if (val == 0) {
      '<span><i class="fa fa-circle icon icon-green"></i></span>'
    }
  }

  exportExcel() {
  
        const worksheet = XLSX.utils.json_to_sheet(this.data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "DanhSachKHcu");
  
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