import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { NetworkserviceService } from 'src/app/services/networkservice.service';
import { network } from 'src/app/components/model/network';
import { from } from 'rxjs';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  data: network[] = [];

  cols: any[];

  clonedData: {} = {};
  displayDialog: boolean;

  constructor(
    private networkserviceService: NetworkserviceService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'mawifi', header: 'Mã WiFi' },
      { field: 'sdtsim', header: 'SDT SIM' },      
      { field: 'masim', header: 'Mã SIM' },

    


    ];
    this.networkserviceService.getAllWiFi().subscribe(val => this.data = val.filter(val=>val.hoten==null))
console.log(this.data)

  }
  selectNetWithButton(value) {
    console.log(value)
  }

  onRowEditInit(val) {
    this.clonedData[val] = {...val};
    console.log(this.clonedData[val])
}

onRowEditSave(val) {
  console.log(val)
}

onRowEditCancel(val,index) {
  this.data[index] = this.clonedData[val];
  delete this.clonedData[val];
console.log(val)
}

showDialogToAdd() {

  this.displayDialog = true;
}
}
