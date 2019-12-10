import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NetworkserviceService } from 'src/app/services/networkservice.service';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userform: FormGroup | any;
  thanhtoanform: FormGroup | any;
  cols: any[]
  hoten = ""
  ghichu = ""
  facebook = ""
  data: any
  thanhtoan_array = []
  thangdongcuoc:any
  luudata: any
  trangthai: any
  editData:any
  constructor(
    private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService
  ) {
    this.initForm();
    this.onFormChanges();

  }

  ngOnInit() {
    this.cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    this.editData=window.history.state
    if(this.editData){
      this.userform.controls.mawifi.setValue(this.editData.MaWiFi)
      this.userform.controls.sdtsim.setValue(this.editData.SDTSim)
      this.userform.controls.masim.setValue(this.editData.MaSim)
      this.userform.controls.hoten.setValue(this.editData.Hoten)
      this.userform.controls.facebook.setValue(this.editData.Facebook)
      this.userform.controls.ngaythue.setValue(this.editData.NgayThue)
      this.userform.controls.ngaytra.setValue(this.editData.NgayTra)
      this.userform.controls.diachi.setValue(this.editData.DiaChi)
      this.userform.controls.giacuoc.setValue(this.editData.GiaCuoc)
      this.userform.controls.trangthai.setValue(this.editData.TrangThai)
      this.userform.controls.ghichu.setValue(this.editData.ghichu)
      this.thangdongcuoc = this.editData.ThangDongCuoc
      if(this.thangdongcuoc==1){this.thanhtoanform.controls.thanhtoan1.setValue(true)} 
      if(this.thangdongcuoc==2){this.thanhtoanform.controls.thanhtoan2.setValue(true)} 
      if(this.thangdongcuoc==3){this.thanhtoanform.controls.thanhtoan3.setValue(true)} 
      if(this.thangdongcuoc==4){this.thanhtoanform.controls.thanhtoan4.setValue(true)} 
      if(this.thangdongcuoc==5){this.thanhtoanform.controls.thanhtoan5.setValue(true)} 
      if(this.thangdongcuoc==6){this.thanhtoanform.controls.thanhtoan6.setValue(true)} 
      if(this.thangdongcuoc==7){this.thanhtoanform.controls.thanhtoan7.setValue(true)} 
      if(this.thangdongcuoc==8){this.thanhtoanform.controls.thanhtoan8.setValue(true)} 
      if(this.thangdongcuoc==9){this.thanhtoanform.controls.thanhtoan9.setValue(true)} 
      if(this.thangdongcuoc==10){this.thanhtoanform.controls.thanhtoan10.setValue(true)} 
      if(this.thangdongcuoc==11){this.thanhtoanform.controls.thanhtoan11.setValue(true)} 
      if(this.thangdongcuoc==12){this.thanhtoanform.controls.thanhtoan12.setValue(true)} 
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
      trangthai: new FormControl(null),
      ghichu: new FormControl(null),
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
        this.trangthai = res.trangthai?1:0

        console.log("userform:", res)
    });
    this.thanhtoanform.valueChanges.subscribe(res => {

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
for(let i=11;i>0;i--){
  if(this.thanhtoan_array[i]==true){
    this.thangdongcuoc=i+1
  }
}
    });
  }

  submit() {
    
    this.luudata = {
      "MaWiFi": this.data.mawifi,
      "SDTSim": this.data.sdtsim,
      "MaSim": this.data.masim,
      "NgayThue": this.data.ngaythue,
      "NgayTra": this.data.ngaytra,
      "ThangDongCuoc": this.thangdongcuoc,
      "GiaCuoc": this.data.giacuoc,
      "Facebook": this.data.facebook,
      "TrangThai": this.trangthai,
      "DiaChi":  this.data.diachi,
      "Hoten": this.hoten,
      "ghichu":this.ghichu,
    }
    console.log(JSON.stringify(this.luudata))
    this.networkserviceService.postAllUser(JSON.stringify(this.luudata)).subscribe(
      data  => {
        alert("Lưu Thành Công");
      console.log("POST Request is successful ", data);
      },
      error  => {
      
      console.log("Error", error);
      
      })
    
    }
}
