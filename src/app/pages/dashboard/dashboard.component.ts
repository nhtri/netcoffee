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
  selectedData: any[] = [];
  selectedFullData:any[] = [];
  data: network[] = [];
  month: any
  date: any
  year: any
  cols: any[];
  trangthaitt: any
  congtacvien: any
  trangthaikh: any
  thaydoitrangthaigroup:any
  ispayment: any
  selthanhtoan: any

  displayDialog = false
  updatedata: any
  updatedatawifi: any
  updatedatawifitralai: any
  olduser: any
  editmawifi: any
  edithoten: any
  editthanhtoan: any
  editthanhtoan2: any
  editcongtacvien: any
  edittrangthai: any
  editdata: any
  userform: FormGroup | any;
  congtacvienform: FormGroup | any;
  trangthaidongtienform: FormGroup | any;
  constructor(
    private networkserviceService: NetworkserviceService,
    private formBuilder: FormBuilder,
  ) {

    this.initForm();
    this.onFormChanges();
    this.ispayment = false
    console.log(this.ispayment)


    this.trangthaikh = [
      { label: 'Sử Dụng', value: 'sudung' },
      { label: 'Tạm Ngưng', value: 'tamngung' },
      { label: 'Hủy', value: 'huy' },
      { label: 'Trả Lại', value: 'tralai' },

      { label: 'Trả Lại - Chưa Trả Cọc', value: 'chuatracoc' }
    ];

    this.thaydoitrangthaigroup = [
      { label: 'Sử Dụng', value: 'sudung' },
      { label: 'Tạm Ngưng', value: 'tamngung' },
      { label: 'Hủy', value: 'huy' }
      // { label: 'Trả Lại', value: 'tralai' },

      // { label: 'Trả Lại - Chưa Trả Cọc', value: 'chuatracoc' }
    ];

    this.congtacvien = [{ label: 'Any', value: 'any' }, { label: 'Khách Lẻ', value: 'khachle' }]
  }

  ngOnInit() {
    this.cols = [
      // { field: 'thangdongcuoc', header: '' },
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'masim', header: 'Mã SIM' },
      { field: 'sdtsim', header: 'DT SIM' },
      { field: 'hoten', header: 'Họ Tên' },
      { field: 'giacuoc', header: 'Giá Cước' },


      { field: 'facebook', header: 'Fb' },
      { field: 'congtacvien', header: 'CTV' },


      { field: 'thanhtoan', header: 'Thanh Toán' },


    ];
    this.networkserviceService.getAllWiFi().subscribe(val =>

      this.data = val.filter(val => val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung')

    )
    this.date = new Date().getDate()
    this.year = new Date().getFullYear()




    if (this.date > 24) {
      this.month = new Date().getMonth() + 1

    }
    if (this.date <= 24) {
      this.month = new Date().getMonth()
    }
    this.trangthaitt = [
      { label: 'All', value: 'all' },
      { label: 'Đã Thanh Toán', value: 'dathanhtoan' },
      { label: 'Chưa Thanh Toán', value: 'chuathanhtoan' }
    ]
    this.congtacvien = [{ label: 'Any', value: 'any' }, { label: 'Khách Lẻ', value: 'khachle' }]

    this.networkserviceService.getAllCongtacvien().subscribe(val => val.forEach(el => {
      this.congtacvien.push({ label: el.hoten, value: el.hoten })
    }))
  }

  initForm() {
    this.userform = this.formBuilder.group({

      trangthaikhdd: new FormControl(null),
      thanhtoanctrl: new FormControl(null)

    })

    this.congtacvienform = this.formBuilder.group({

      congtacviencontrol: new FormControl(null)

    })

    this.trangthaidongtienform = this.formBuilder.group({

      trangthaidongtiencontrol: new FormControl(null)

    })
  }

  onFormChanges() {

    this.userform.valueChanges.subscribe(res => {
      this.edittrangthai = res.trangthaikhdd
      this.editthanhtoan = res.thanhtoanctrl
      new Date(this.editthanhtoan.setDate(this.editthanhtoan.getDate() + 1))
      console.log('res', new Date(this.editthanhtoan.setDate(this.editthanhtoan.getDate() + 1)))
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

    if (this.congtacvienform.get('congtacviencontrol').value === 'khachle') {
      if (value == 'dathanhtoan') {
        console.log(this.congtacvienform.get('congtacviencontrol').value)
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
          (val =>

            val.congtacvien == 'khachle' &&
            val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&

            (new Date(val.thanhtoan).getMonth() >= this.month
              && new Date(val.thanhtoan).getFullYear() == this.year)
            || new Date(val.thanhtoan).getFullYear() > this.year

          )
        )
      }
      else if (value == 'chuathanhtoan') {
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val =>
          val.congtacvien === 'khachle' &&
          val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung' &&
          (new Date(val.thanhtoan).getMonth() < this.month ||
            new Date(val.thanhtoan).getFullYear() < this.year)))
      }
      else if (value == 'all') {
        this.networkserviceService.getAllWiFi().subscribe(val =>

          this.data = val.filter(val =>
            val.congtacvien === 'khachle' &&
            val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'


          )


        )

      }
    }
    else if (this.congtacvienform.get('congtacviencontrol').value === 'any'||this.congtacvienform.get('congtacviencontrol').value === null) {
      if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'dathanhtoan') {

        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
          (val =>

            val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&

            (new Date(val.thanhtoan).getMonth() >= this.month
              && new Date(val.thanhtoan).getFullYear() == this.year)
            || new Date(val.thanhtoan).getFullYear() > this.year

          )
        )
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'chuathanhtoan') {
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val =>

          val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung' &&
          (new Date(val.thanhtoan).getMonth() < this.month ||
            new Date(val.thanhtoan).getFullYear() < this.year)))
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'all'||this.trangthaidongtienform.get('trangthaidongtiencontrol').value == null) {
        this.networkserviceService.getAllWiFi().subscribe(val =>

          this.data = val.filter(val =>
            val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'


          )


        )

      }
    }
    else {
      if (value == 'dathanhtoan') {
        console.log(this.congtacvienform.get('congtacviencontrol').value)
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
          (val =>

            val.congtacvien === this.congtacvienform.get('congtacviencontrol').value &&
            val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&

            (new Date(val.thanhtoan).getMonth() >= this.month
              && new Date(val.thanhtoan).getFullYear() == this.year)
            || new Date(val.thanhtoan).getFullYear() > this.year

          )
        )
      }
      else if (value == 'chuathanhtoan') {
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val =>
          val.congtacvien === this.congtacvienform.get('congtacviencontrol').value &&
          val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung' &&
          (new Date(val.thanhtoan).getMonth() < this.month ||
            new Date(val.thanhtoan).getFullYear() < this.year)))
      }
      else if (value == 'all') {
        this.networkserviceService.getAllWiFi().subscribe(val =>

          this.data = val.filter(val =>
            val.congtacvien === this.congtacvienform.get('congtacviencontrol').value &&
            val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'


          )


        )

      }

    }

    console.log('value', value)
  }

  onchangectv(value) {
    console.log(value)


    if (this.congtacvienform.get('congtacviencontrol').value === 'khachle') {
      if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'dathanhtoan') {

        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
          (val =>

            val.congtacvien == 'khachle' && val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&

            (new Date(val.thanhtoan).getMonth() >= this.month
              && new Date(val.thanhtoan).getFullYear() == this.year)
            || new Date(val.thanhtoan).getFullYear() > this.year

          )
        )
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'chuathanhtoan') {
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val =>
          val.congtacvien === 'khachle' &&
          val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung' &&
          (new Date(val.thanhtoan).getMonth() < this.month ||
            new Date(val.thanhtoan).getFullYear() < this.year)))
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'all'||this.trangthaidongtienform.get('trangthaidongtiencontrol').value == null) {
        console.log('test1')
        this.networkserviceService.getAllWiFi().subscribe(val =>

          this.data = val.filter(val =>
            val.congtacvien == 'khachle' &&
            val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'


          )


        )

      }
    }
    else if (this.congtacvienform.get('congtacviencontrol').value === 'any') {
      if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'dathanhtoan') {

        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
          (val =>

            val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&

            (new Date(val.thanhtoan).getMonth() >= this.month
              && new Date(val.thanhtoan).getFullYear() == this.year)
            || new Date(val.thanhtoan).getFullYear() > this.year

          )
        )
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'chuathanhtoan') {
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val =>

          val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung' &&
          (new Date(val.thanhtoan).getMonth() < this.month ||
            new Date(val.thanhtoan).getFullYear() < this.year)))
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'all'||this.trangthaidongtienform.get('trangthaidongtiencontrol').value == null) {
        this.networkserviceService.getAllWiFi().subscribe(val =>

          this.data = val.filter(val =>
            val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'


          )


        )

      }
    }
    else {
      if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'dathanhtoan') {

        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter
          (val =>

            val.congtacvien === this.congtacvienform.get('congtacviencontrol').value &&
            val.hoten != null && val.trangthai_kh == 'sudung' && val.hoten != '' &&

            (new Date(val.thanhtoan).getMonth() >= this.month
              && new Date(val.thanhtoan).getFullYear() == this.year)
            || new Date(val.thanhtoan).getFullYear() > this.year

          )
        )
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'chuathanhtoan') {
        this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val =>
          val.congtacvien === this.congtacvienform.get('congtacviencontrol').value &&
          val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung' &&
          (new Date(val.thanhtoan).getMonth() < this.month ||
            new Date(val.thanhtoan).getFullYear() < this.year)))
      }
      else if (this.trangthaidongtienform.get('trangthaidongtiencontrol').value == 'all'||this.trangthaidongtienform.get('trangthaidongtiencontrol').value == null) {
        this.networkserviceService.getAllWiFi().subscribe(val =>

          this.data = val.filter(val =>
            val.congtacvien === this.congtacvienform.get('congtacviencontrol').value &&
             val.hoten != null && val.hoten != '' && val.trangthai_kh == 'sudung'


          )
        )

      }

    }
  }

  onchangethaydoictv(value) {
    if (confirm("Bạn có muốn thay đổi cộng tác viên không")) {
      this.selectedData.forEach(element => {
        const updateData = [value, element]
        this.networkserviceService.updatewificongtacvien(updateData).subscribe(
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
    } else {

    }

    // this.ngOnInit()
  }

  onchangethaydoitrangthaigroup(value) {

    if (confirm("Bạn có muốn thay đổi trạng thái không")) {
      if (value == 'tamngung') {
        this.selectedFullData.forEach(element => {
          const updateData = ['tamngung', element.mawifi]
          this.networkserviceService.updatewifitamngung(updateData).subscribe(
            data => {
              console.log("POST Request is successful ", data);
            },
            error => {
              console.log("Error", error);
            });
          alert("Lưu Thành Công");
          this.displayDialog = false;
          location.reload();
        });
      } else if(value == 'huy') {
        this.selectedFullData.forEach(element => {
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
            element.sdtsim,
            element.masim,
            'sudung',
            null,
            null,
            null,
            'doicaplaisim',
            element.mawifi,
          ]
          this.networkserviceService.updateAllUser(this.updatedatawifi).subscribe(
            data => {
              alert("Lưu Thành Công");


              console.log("POST Request is successful ", data);
            },
            error => {

              console.log("Error", error);

            })

            this.olduser = [
              element.mawifi,
              element.sdtsim,
              element.masim,
              element.ngaythue,
              new Date(),
              null,
              element.giacuoc,
              element.facebook,
              null,
              element.diachi,
              element.hoten,
              element.ghichu,
              'huy',
              null,
              null,
              element.congtacvien,
              null
            ]

          this.networkserviceService.postAllAccount(this.olduser).subscribe(
            data => {
              alert("Lưu Khách Hàng cũ Thành Công");
              console.log("POST Request is successful ", data);

          location.reload();
            },
            error => {

              console.log("Error", error);

            })
        });
      }

    }
  }


  onRowSelect($event) {
    this.selectedData.push($event.data.mawifi)
    console.log(this.selectedData)
    this.selectedFullData.push($event.data)
    console.log('selectedFullData',this.selectedFullData)
  }

  onRowUnselect($event) {
    console.log($event)
    this.selectedData = this.selectedData.filter(item => item !== $event.data.mawifi)
    this.selectedFullData = this.selectedFullData.filter(item => item !== $event.data)
    console.log(this.selectedData)
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
      this.edittrangthai = 'sudung'
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


    if (this.edittrangthai == 'tamngung' || this.edittrangthai == 'sudung') {
      this.networkserviceService.updateAllUser(this.updatedata).subscribe(
        data => {
          alert("Lưu Thành Công");
          this.displayDialog = false;
          this.userform.controls.trangthaikhdd.setValue(null)
          this.ngOnInit()

          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })
    }

    if (this.edittrangthai == 'huy' ) {

      this.networkserviceService.updateAllUser(this.updatedatawifi).subscribe(
        data => {
          alert("Lưu Thành Công");
          this.displayDialog = false;
          this.userform.controls.trangthaikhdd.setValue(null)
          this.ngOnInit()


          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })



      this.networkserviceService.postAllAccount(this.olduser).subscribe(
        data => {
          alert("Lưu Khách Hàng cũ Thành Công");
          // location.reload();
          this.userform.controls.trangthaikhdd.setValue(null)
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
          this.userform.controls.trangthaikhdd.setValue(null)
          this.ngOnInit()


          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })



      this.networkserviceService.postAllAccount(this.olduser).subscribe(
        data => {
          alert("Lưu Khách Hàng cũ Thành Công");
          this.ngOnInit()

        },
        error => {

          console.log("Error", error);

        })
    }

  }

  onSelectThanhToan(val){

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

  onTableHeaderCheckboxToggle(val){
    if(val.checked===true){
      this.data.filter(data=> this.selectedData.push(data.mawifi))
    }
else if(val.checked===false){
  this.selectedData=[];
}
    console.log(val,this.selectedData)
  }
}
