import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userform: FormGroup | any;
  thanhtoanform: FormGroup | any;
  cols1: any[]
  cols2: any[]
  hoten = ""
  ghichu = ""
  facebook = ""
  data: any
  thanhtoan_array = []
  thangdongcuoc: any
  luudata: any
  updatedata: any
  trangthai_kh: any
  editData: any
  input1: any
  input2: any
  // checked: boolean
  ngaythue: Date
  ngaytra: Date
  olduser: any
  trangthaikh: any
  namthanhtoan:any
  isDisable:boolean
  constructor(
    private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService,
    private router: Router
  ) {
    this.isDisable = false
    this.initForm();
    this.onFormChanges();
    this.trangthaikh = [
      {label:'Sử Dụng', value:'sudung'},
      {label:'Hủy', value:'huy'},
      {label:'Trả Lại', value:'tralai'},
     
  ];
  this.namthanhtoan=[
    {label:new Date().getFullYear(),value:new Date().getFullYear()},
    {label:new Date().getFullYear() + 1,value:new Date().getFullYear()+1},
  ]
  }

  ngOnInit() {
    this.cols1 = ['1', '2', '3', '4', '5', '6']
    this.cols2 = ['7', '8', '9', '10', '11', '12']
    this.editData = window.history.state
    this.userform.trangthaikhdd = 'sudung'
    if (this.editData.mawifi && this.editData.trangthai_kh =='sudung') {

      this.userform.controls.mawifi.setValue(this.editData.mawifi)
      this.userform.controls.mawifi.disable()
      this.userform.controls.sdtsim.setValue(this.editData.sdtsim)
      this.userform.controls.sdtsim.disable()
      this.userform.controls.masim.setValue(this.editData.masim)
      this.userform.controls.masim.disable()
      this.userform.controls.hoten.setValue(this.editData.hoten)
      this.userform.controls.facebook.setValue(this.editData.facebook)

      if (this.editData.ngaythue) {
        this.userform.controls.ngaythue.setValue(new Date(this.editData.ngaythue))
      }

      if (this.editData.ngaytra) {
        this.userform.controls.ngaytra.setValue(new Date(this.editData.ngaytra))
      }

      this.userform.controls.diachi.setValue(this.editData.diachi)
      this.userform.controls.giacuoc.setValue(this.editData.giacuoc)
      this.userform.controls.trangthaikhdd.setValue(this.editData.trangthai_kh)
      // this.checked = this.editData.trangthai
      this.userform.controls.ghichu.setValue(this.editData.ghichu)
      this.thangdongcuoc = this.editData.thangdongcuoc
      if (this.thangdongcuoc == 1) { this.thanhtoanform.controls.thanhtoan1.setValue(true) }
      if (this.thangdongcuoc == 2) { this.thanhtoanform.controls.thanhtoan2.setValue(true) }
      if (this.thangdongcuoc == 3) { this.thanhtoanform.controls.thanhtoan3.setValue(true) }
      if (this.thangdongcuoc == 4) { this.thanhtoanform.controls.thanhtoan4.setValue(true) }
      if (this.thangdongcuoc == 5) { this.thanhtoanform.controls.thanhtoan5.setValue(true) }
      if (this.thangdongcuoc == 6) { this.thanhtoanform.controls.thanhtoan6.setValue(true) }
      if (this.thangdongcuoc == 7) { this.thanhtoanform.controls.thanhtoan7.setValue(true) }
      if (this.thangdongcuoc == 8) { this.thanhtoanform.controls.thanhtoan8.setValue(true) }
      if (this.thangdongcuoc == 9) { this.thanhtoanform.controls.thanhtoan9.setValue(true) }
      if (this.thangdongcuoc == 10) { this.thanhtoanform.controls.thanhtoan10.setValue(true) }
      if (this.thangdongcuoc == 11) { this.thanhtoanform.controls.thanhtoan11.setValue(true) }
      if (this.thangdongcuoc == 12) { this.thanhtoanform.controls.thanhtoan12.setValue(true) }
    }
    else if (this.editData.trangthai_kh == 'huy' || this.editData.trangthai_kh == 'tralai'){
      this.isDisable=true
      console.log('isDisable',this.isDisable)
      this.userform.controls.mawifi.setValue(this.editData.mawifi)
      
      this.userform.controls.sdtsim.setValue(this.editData.sdtsim)
     
      this.userform.controls.masim.setValue(this.editData.masim)
     
      this.userform.controls.hoten.setValue(this.editData.hoten)
      this.userform.controls.facebook.setValue(this.editData.facebook)

      if (this.editData.ngaythue) {
        this.userform.controls.ngaythue.setValue(new Date(this.editData.ngaythue))
      }

      if (this.editData.ngaytra) {
        this.userform.controls.ngaytra.setValue(new Date(this.editData.ngaytra))
      }

      this.userform.controls.diachi.setValue(this.editData.diachi)
      this.userform.controls.giacuoc.setValue(this.editData.giacuoc)
      this.userform.controls.trangthaikhdd.setValue(this.editData.trangthai_kh)
      // this.checked = this.editData.trangthai
      this.userform.controls.ghichu.setValue(this.editData.ghichu)
      this.thangdongcuoc = this.editData.thangdongcuoc
      if (this.thangdongcuoc == 1) { this.thanhtoanform.controls.thanhtoan1.setValue(true) }
      if (this.thangdongcuoc == 2) { this.thanhtoanform.controls.thanhtoan2.setValue(true) }
      if (this.thangdongcuoc == 3) { this.thanhtoanform.controls.thanhtoan3.setValue(true) }
      if (this.thangdongcuoc == 4) { this.thanhtoanform.controls.thanhtoan4.setValue(true) }
      if (this.thangdongcuoc == 5) { this.thanhtoanform.controls.thanhtoan5.setValue(true) }
      if (this.thangdongcuoc == 6) { this.thanhtoanform.controls.thanhtoan6.setValue(true) }
      if (this.thangdongcuoc == 7) { this.thanhtoanform.controls.thanhtoan7.setValue(true) }
      if (this.thangdongcuoc == 8) { this.thanhtoanform.controls.thanhtoan8.setValue(true) }
      if (this.thangdongcuoc == 9) { this.thanhtoanform.controls.thanhtoan9.setValue(true) }
      if (this.thangdongcuoc == 10) { this.thanhtoanform.controls.thanhtoan10.setValue(true) }
      if (this.thangdongcuoc == 11) { this.thanhtoanform.controls.thanhtoan11.setValue(true) }
      if (this.thangdongcuoc == 12) { this.thanhtoanform.controls.thanhtoan12.setValue(true) }
     
    }
    else{
      this.userform.controls.trangthaikhdd.setValue('sudung')
      this.userform.controls.trangthaikhdd.disable()
    }
  }

  initForm() {
    this.userform = this.formBuilder.group({
      mawifi: new FormControl(null),
      sdtsim: new FormControl(null),
      masim: new FormControl(null),
      hoten: new FormControl(null),
      facebook: new FormControl(null),
      ngaythue: new FormControl(null),
      ngaytra: new FormControl(null),
      diachi: new FormControl(null),
      giacuoc: new FormControl(null),
      trangthaikhdd: new FormControl('sudung'),
      ghichu: new FormControl(null),
      namthanhtoan:new FormControl(null),
    
    })
    this.thanhtoanform = this.formBuilder.group({
      thanhtoan1: new FormControl(null),
      thanhtoan2: new FormControl(null),
      thanhtoan3: new FormControl(null),
      thanhtoan4: new FormControl(null),
      thanhtoan5: new FormControl(null),
      thanhtoan6: new FormControl(null),
      thanhtoan7: new FormControl(null),
      thanhtoan8: new FormControl(null),
      thanhtoan9: new FormControl(null),
      thanhtoan10: new FormControl(null),
      thanhtoan11: new FormControl(null),
      thanhtoan12: new FormControl(null),
    });

  }

  onFormChanges() {

    this.userform.valueChanges.subscribe(res => {
      this.data = res,
        this.hoten = res.hoten,
        this.ghichu = res.ghichu,
        this.facebook = res.facebook,
        this.trangthai_kh = res.trangthaikhdd


     
    });



    this.thanhtoanform.valueChanges.subscribe(res => {
      this.thanhtoan_array = []
      this.thanhtoan_array.push(res.thanhtoan1)
      this.thanhtoan_array.push(res.thanhtoan2)
      this.thanhtoan_array.push(res.thanhtoan3)
      this.thanhtoan_array.push(res.thanhtoan4)
      this.thanhtoan_array.push(res.thanhtoan5)
      this.thanhtoan_array.push(res.thanhtoan6)
      this.thanhtoan_array.push(res.thanhtoan7)
      this.thanhtoan_array.push(res.thanhtoan8)
      this.thanhtoan_array.push(res.thanhtoan9)
      this.thanhtoan_array.push(res.thanhtoan10)
      this.thanhtoan_array.push(res.thanhtoan11)
      this.thanhtoan_array.push(res.thanhtoan12)

      console.log("thanhtoanform:", this.thanhtoan_array)
      for (let i = 11; i > 0; i--) {
        if (this.thanhtoan_array[i] == true) {
          this.thangdongcuoc = i + 1
          break;
        }
      }
    });
  }

  submit() {

    
    this.userform.controls.mawifi.enable();
    this.userform.controls.sdtsim.enable();
    this.userform.controls.masim.enable();
    if(this.trangthai_kh == null){
      this.trangthai_kh = 'sudung'
     
    }
    this.luudata = [
      this.data.mawifi,
      this.data.sdtsim,
      this.data.masim,
      this.data.ngaythue,
      this.data.ngaytra,
      this.thangdongcuoc,
      this.data.giacuoc,
      this.data.facebook,
      true,
      this.data.diachi,
      this.hoten,
      this.ghichu,
      this.trangthai_kh
    ]

    this.updatedata = [
      this.data.ngaythue,
      this.data.ngaytra,
      this.thangdongcuoc,
      this.data.giacuoc,
      this.data.facebook,
      true,
      this.data.diachi,
      this.hoten,
      this.ghichu,
      this.data.sdtsim,
      this.data.masim,
      'sudung',
      this.data.mawifi,
    ]

    this.olduser = [
      this.data.mawifi,
      this.data.sdtsim,
      this.data.masim,
      this.editData.ngaythue,
      this.editData.ngaytra,
      this.thangdongcuoc,
      this.data.giacuoc,
      this.editData.facebook,
      null,
      this.editData.diachi,
      this.editData.hoten,
      this.editData.ghichu,
      this.trangthai_kh,
    ]
    console.log(JSON.stringify(this.luudata))
    if (this.editData.mawifi) {
      this.networkserviceService.updateAllUser(this.updatedata).subscribe(
        data => {
          alert("Lưu Thành Công");
          this.router.navigateByUrl('dashboard')
          console.log("POST Request is successful ", data);
        },
        error => {

          console.log("Error", error);

        })
      if (this.trangthai_kh == 'huy' || this.trangthai_kh == 'tralai') {
        this.networkserviceService.postAllUser(this.olduser).subscribe(
          data => {
            alert("Lưu Khách Hàng cũ Thành Công");
            this.router.navigateByUrl('dashboard')
            console.log("POST Request is successful ", data);
          },
          error => {

            console.log("Error", error);

          })
      }
    }
    else {
      if (this.data.mawifi && this.data.masim && this.data.sdtsim && this.data.hoten) {
        this.networkserviceService.postAllUser(this.luudata).subscribe(
          data => {
            alert("Lưu Thành Công");
            this.router.navigateByUrl('dashboard')
            console.log("POST Request is successful ", data);
          },
          error => {

            console.log("Error", error);

          })
      }
      else {
        alert("Điền thông tin vào ô * trống");
      }
    }

  }

  onchange() {
    if (this.trangthai_kh == 'huy' || this.trangthai_kh == 'tralai') {
      this.userform.controls.ngaytra.setValue(new Date())
      this.userform.controls.hoten.setValue(null)
      this.userform.controls.facebook.setValue(null)
      this.userform.controls.diachi.setValue(null)
      this.userform.controls.giacuoc.setValue(null)
      this.userform.controls.ghichu.setValue(null)
      this.thanhtoanform.reset()
      
      console.log('editData', this.editData)
    }
    else
      this.userform.controls.ngaytra.setValue(null)
    console.log(this.trangthai_kh)
  }

  cancel() {
    this.router.navigateByUrl('dashboard')
  }
}
