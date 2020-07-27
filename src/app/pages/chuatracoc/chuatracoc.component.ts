import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { network } from 'src/app/components/model/network';
import { NetworkserviceService } from 'src/app/services/networkservice.service';

@Component({
  selector: 'app-chuatracoc',
  templateUrl: './chuatracoc.component.html',
  styleUrls: ['./chuatracoc.component.scss']
})
export class ChuatracocComponent implements OnInit {
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
      {field: 'ngaytra', header: 'Ngày Trả' }
   


    ];
    this.networkserviceService.getAllAccount().subscribe(val => this.data = val.filter(val => val.trangthai_kh == 'chuatracoc'))



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
        this.saveAsExcelFile(excelBuffer, "DanhSachKH_TRALAI");
  
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
