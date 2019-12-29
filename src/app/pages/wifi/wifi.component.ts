import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  data: network[] = [];
 
  wifiform: FormGroup | any;
  cols: any[];
wifidata:any
luuwifidata:any
wifidataupdate:any
  clonedData: {[s: string]: network;} = {};
  displayDialog: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private networkserviceService: NetworkserviceService,
    private router: Router
  ) { 
    this.initForm();
    this.onFormChanges();
  }

  ngOnInit() {
    this.cols = [
     
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'sdtsim', header: 'SDT SIM' },      
      { field: 'masim', header: 'Mã SIM' },

    


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val=>val.hoten==null || val.hoten==''))
console.log(this.data)

  }

  initForm() {
    this.wifiform = this.formBuilder.group({
      mawifi: new FormControl(null),
      sdtsim: new FormControl(null),
      masim: new FormControl(null),
     
    })}

    onFormChanges() {
      this.wifiform.valueChanges.subscribe(res => {
 
       this.wifidata=res
        console.log("wifiform:", res)
      });
  
     }

  selectNetWithButton(value) {
    console.log(value)
  }

  onRowEditInit(val) {
    this.clonedData[val] = {...val};
    console.log(this.clonedData[val])
}

onRowEditSave(val) {
  this.wifidataupdate = [
    null,
    null,
    null,
    null,
    true,
    null,
    null,
    null,
    null,
    val.sdtsim,
    val.masim,
    val.mawifi,
  ]
  this.networkserviceService.updateAllUser(this.wifidataupdate).subscribe(
    data => {
      alert("Lưu Thành Công");
     
      console.log("POST Request is successful ", data);
    },
    error => {

      console.log("Error", error);

    })
  console.log(val)
}

onRowEditCancel(val,index) {
  this.data[index] = this.clonedData[val];
  delete this.clonedData[val];
console.log(val,index)
}

onRowDelete(val) {

  this.networkserviceService.deleteUser(val.mawifi).subscribe(
    data => {
      alert("Xóa Thành Công");
     this.ngOnInit();
      console.log("POST Request is successful ", data);
    },
    error => {

      console.log("Error", error);

    })

console.log(val)
}

showDialogToAdd() {

  this.displayDialog = true;
}

save(){
  if (this.wifidata.mawifi && this.wifidata.masim && this.wifidata.sdtsim ) {
    this.luuwifidata = [
      this.wifidata.mawifi,
      this.wifidata.sdtsim,
      this.wifidata.masim,
      , null, null, null, null, true, null, null, null
    ]
    this.networkserviceService.postAllUser(this.luuwifidata).subscribe(
      data => {
        alert("Lưu Thành Công");
        this.router.navigateByUrl('wifi')
        location.reload();
        console.log("POST Request is successful ", data);
      },
      error => {

        console.log("Error", error);

      })
  }
  else{
    alert("Điền thông tin vào ô * trống");
  }
}


}
