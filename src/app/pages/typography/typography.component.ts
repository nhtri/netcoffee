import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: "app-typography",
  templateUrl: "typography.component.html"
})
export class TypographyComponent implements OnInit {
  selectedData: any[] = [];
  data: network[] = [];
  editthanhtoan2: any
  cols: any[];
  trangthaikh: any
  userform: FormGroup | any;
  displayDialog = false
  updatedata: any
  updatedatawifi: any
  updatedatawifitralai: any
  olduser: any
  editmawifi: any
  edithoten: any
  edittrangthai: any
  editthanhtoan: any
  editdata: any
  constructor(
    private networkserviceService: NetworkserviceService,
    private formBuilder: FormBuilder,
  ) {

    this.initForm();
    this.onFormChanges();


  }

  ngOnInit() {

    this.cols = [
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'hoten', header: 'Họ Tên' },
      { field: 'sdtsim', header: 'SĐT Sim' },
      { field: 'giacuoc', header: 'Giá Cước' },


      { field: 'facebook', header: 'Fb' },


      { field: 'thanhtoan', header: 'Thanh Toán' },


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val => val.trangthai_kh == 'tamngung'))


  }

  initForm() {
    this.trangthaikh = [
      { label: 'Tạm Ngưng', value: 'tamngung' },
      { label: 'Sử Dụng', value: 'sudung' },

      { label: 'Hủy', value: 'huy' },
      { label: 'Trả Lại', value: 'tralai' },

      { label: 'Trả Lại - Chưa Trả Cọc', value: 'chuatracoc' }
    ];
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
      console.log(res)
    });

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
    this.saveAsExcelFile(excelBuffer, "DanhSachKH_TAMNGUNG");

  }

  saveAsExcelFile(buffer: any, fileName: string): void {

    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }



  onRowEditInit(val) {
    this.editdata = val
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
    if (this.edittrangthai == null) {
      this.edittrangthai = 'tamngung'
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
      this.editdata.congtacvien,
      null,
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
      null,
      'doicaplaisim',
      this.editdata.mawifi,
    ]
    this.updatedatawifitralai = [
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
      this.editthanhtoan,
      this.editdata.congtacvien,
      null
    ]


    if (this.edittrangthai == 'sudung' || this.edittrangthai == 'tamngung') {
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

    if (this.edittrangthai == 'huy' ) {

      
      console.log(this.updatedatawifi)
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

    if (this.edittrangthai == 'tralai' || this.edittrangthai == 'chuatracoc') {

      
      console.log(this.updatedatawifitralai)
      this.networkserviceService.updateAllUser(this.updatedatawifitralai).subscribe(
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


  onSelectThanhToan(val){
 console.log(val)
    if (confirm("Bạn có muốn thay đổi thanh tóan không")) {
      this.editthanhtoan2 = val
      new Date(this.editthanhtoan2.setDate(this.editthanhtoan2.getDate() + 1))
      console.log('res2', new Date(this.editthanhtoan2.setDate(this.editthanhtoan2.getDate() + 1)))
      
      this.selectedData.forEach(element => {
        const updateData = [this.editthanhtoan2, element]
        this.networkserviceService.updatewifithanhtoan(updateData).subscribe(
          data => {
            console.log("POST Request is successful ", data);
          },
          error => {
            console.log("Error", error);
          })
      });
      alert("Lưu Thành Công");
      this.displayDialog = false;
      location.reload();
      //this.ngOnInit()
    } else {
     
    }

    
      // 
  }

  onRowSelect($event) {
    this.selectedData.push($event.data.mawifi)
    console.log(this.selectedData)
  }

  onRowUnselect($event) {
    console.log($event)
    this.selectedData = this.selectedData.filter(item => item !== $event.data.mawifi)
    console.log(this.selectedData)
  }
}
