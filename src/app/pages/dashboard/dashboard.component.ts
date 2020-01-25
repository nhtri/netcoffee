import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: network[] = [];
  month: any
  date: any
  year:any
  cols: any[];
  trangthaitt: any
  trangthaikh:any
  ispayment:any
  selthanhtoan:any
  
  displayDialog=false
  updatedata:any
  updatedatawifi:any
  olduser:any
  editmawifi:any
  edithoten:any
  editthanhtoan:any
  edittrangthai:any
  editdata:any
  userform: FormGroup | any;

  constructor(
    private networkserviceService: NetworkserviceService,
    private formBuilder: FormBuilder,
  ) {

    this.initForm();
    this.onFormChanges();
    this.ispayment = false
    console.log(this.ispayment)
    this.trangthaitt = [
      { label: 'All', value: 'all' },
      { label: 'Đã Thanh Toán', value: 'dathanhtoan' },
      { label: 'Chưa Thanh Toán', value: 'chuathanhtoan' }
    ]

    this.trangthaikh = [
      {label:'Sử Dụng', value:'sudung'},
      {label:'Tạm Ngưng', value:'tamngung'},
      {label:'Hủy', value:'huy'},
      {label:'Trả Lại', value:'tralai'},
     
  ];
  }

  ngOnInit() {
    this.cols = [
      // { field: 'thangdongcuoc', header: '' },
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'hoten', header: 'Họ Tên' },
      { field: 'giacuoc', header: 'Giá Cước' },
    

      { field: 'facebook', header: 'Fb' },
      
     
      { field: 'thanhtoan', header: 'Thanh Toán' },
      

    ];
    this.networkserviceService.getAllWiFi().subscribe(val => 
      
      this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.trangthai_kh =='sudung')
      
      )
    this.date = new Date().getDate()
    this.year = new Date().getFullYear()

    // if (this.date > 24) {
    //   this.month = new Date().getMonth() + 1
    //   if (new Date().getMonth() + 1 == 1) {
    //     this.month = 13
    //   }
    // }
    // if (this.date <= 24) {
    //   if (new Date().getMonth() == 0) {
    //     this.month = 12
    //   }
    // }

    
    if (this.date > 24) {
      this.month = new Date().getMonth() + 1
    
    }
    if (this.date <= 24) {
      this.month = new Date().getMonth() 
    }

    console.log(this.date, this.month,new Date(), new Date("2020-03-02T00:00:00.000Z").getMonth())
  }

  initForm() {
    this.userform = this.formBuilder.group({

      trangthaikhdd: new FormControl(null),
      thanhtoanctrl: new FormControl(null)

    })


  }

  onFormChanges() {

    this.userform.valueChanges.subscribe(res => {
      this.edittrangthai = res.trangthaikhdd
      this.editthanhtoan = res.thanhtoanctrl
      new Date(this.editthanhtoan.setDate(this.editthanhtoan.getDate() + 1))
console.log('res',new Date(this.editthanhtoan.setDate(this.editthanhtoan.getDate() + 1)))
    });

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
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
      (val => 
    
      val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&  
      
        new Date(val.thanhtoan).getMonth() == this.month 
        && new Date(val.thanhtoan).getFullYear() == this.year
        )
        )
    }
    else if(value == 'chuathanhtoan'){
      this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => 
        val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'&&
        (new Date(val.thanhtoan).getMonth() < this.month || 
        new Date(val.thanhtoan).getFullYear() < this.year)))
    }
    else if(value == 'all'){
      this.networkserviceService.getAllWiFi().subscribe(val => 
        
        this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.trangthai_kh =='sudung'
        
        
        )
       
        
        )
    
    }
    console.log('value', value)
  }

  
  onRowEditInit(val) {
    this.editdata=val
    this.displayDialog = true;
    this.editmawifi = val.mawifi
    this.edithoten = val.hoten
    this.editthanhtoan = val.thanhtoan
    this.userform.controls.thanhtoanctrl.setValue(new Date(val.thanhtoan))
  }

  cancel() {
    this.displayDialog = false;
  }

  save() {

    if(this.edittrangthai==null){
      this.edittrangthai='sudung'
    }
    this.updatedata = [
      this.editdata.ngaythue,
      this.editdata.ngaytra,
      null,
      this.editdata.giacuoc,
      this.editdata.facebook,
      true,
      this.editdata.diachi,
      this.editdata.hoten,
      this.editdata.ghichu,
      this.editdata.sdtsim,
      this.editdata.masim,
      //'sudung',
      this.edittrangthai,
      null,
      this.editthanhtoan,
      this.editdata.mawifi,
    ]

    this.updatedatawifi = [
      null,
      null,
      null,
      null,
      null,
      true,
      null,
      null,
      null,
      this.editdata.sdtsim,
      this.editdata.masim,
      //'sudung',
      'sudung',
      null,
      null,
      this.editdata.mawifi,
    ]

    this.olduser = [
      this.editdata.mawifi,
      this.editdata.sdtsim,
      this.editdata.masim,
      this.editdata.ngaythue,
      new Date(),
      null,
      this.editdata.giacuoc,
      this.editdata.facebook,
      null,
      this.editdata.diachi,
      this.editdata.hoten,
      this.editdata.ghichu,
      this.edittrangthai,
      null,
      this.editthanhtoan
    ]


    if (this.edittrangthai =='tamngung' || this.edittrangthai == 'sudung' ) {
      this.networkserviceService.updateAllUser(this.updatedata).subscribe(
        data => {
          alert("Lưu Thành Công");
          this.displayDialog = false;
        this.ngOnInit()
        this.userform.controls.trangthaikhdd.setValue(null)
          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })
      }

      if (this.edittrangthai =='huy' || this.edittrangthai == 'tralai' ) {

        this.networkserviceService.updateAllUser(this.updatedatawifi).subscribe(
          data => {
            alert("Lưu Thành Công");
            this.displayDialog = false;
          this.ngOnInit()
          this.userform.controls.trangthaikhdd.setValue(null)
            console.log("POST Request is successful ", data);
          },
          error => {
  
            console.log("Error", error);
  
          })



        this.networkserviceService.postAllAccount(this.olduser).subscribe(
          data => {
            alert("Lưu Khách Hàng cũ Thành Công");
            this.ngOnInit()
            console.log("POST Request is successful ", data);
          },
          error => {

            console.log("Error", error);

          })
        }



    }
}
