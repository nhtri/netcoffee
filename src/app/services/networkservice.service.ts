import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {NETWORK} from '../constant/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { network } from '../components/model/network';

@Injectable({
  providedIn: 'root'
})





export class NetworkserviceService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
  user:any=[]
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllWiFi() {
    const getAllWiFiAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.get<any>(getAllWiFiAPI);    
  }

  getAllCongtacvien() {
    const getAllCongtacvienAPI = `${NETWORK.API.Congtacvien}`;
    return this.httpClient.get<any>(getAllCongtacvienAPI);    
  }

  getAllAccount() {
    const getAllAccountAPI = `${NETWORK.API.ACCOUNT}`;
    return this.httpClient.get<any>(getAllAccountAPI);    
  }

  updatewificongtacvien(data){
    const updatewificongtacvienAPI = `${NETWORK.API.WiFiCongtacvien}`;
    return this.httpClient.put<any>(updatewificongtacvienAPI, data,this.httpOptions)  
  }

  updatewifithanhtoan(data){
    const updatewifithanhtoanAPI = `${NETWORK.API.WiFiThanhtoan}`;
    return this.httpClient.put<any>(updatewifithanhtoanAPI, data,this.httpOptions)  
  }

  getOldWiFi() {
    const getOldWiFiAPI = `${NETWORK.API.Old}`;
    return this.httpClient.get<any>(getOldWiFiAPI);    
  }

  getAllUser() {
    const getAllUserAPI = `${NETWORK.API.Admin}`;
    return this.httpClient.get<any>(getAllUserAPI);    
  }

  

  postAllUser(data): Observable<any>  {
    const postAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.post<any>(postAllUserAPI, data,this.httpOptions)  
  }

  postAllAccount(data): Observable<any>  {
    const postAllAccountAPI = `${NETWORK.API.ACCOUNT}`;
    return this.httpClient.post<any>(postAllAccountAPI, data,this.httpOptions)  
  }

  postAllCongtacvien(data): Observable<any>  {
    const postAllCongtacviebAPI = `${NETWORK.API.Congtacvien}`;
    return this.httpClient.post<any>(postAllCongtacviebAPI, data,this.httpOptions)  
  }

  deleteUser(data): Observable<any>  {
    const deleteUserAPI = `${NETWORK.API.WiFi}/${data}`;
    return this.httpClient.delete(deleteUserAPI)  
  }

  deleteCongtacvien(data): Observable<any>  {
    const deleteCongtacvienAPI = `${NETWORK.API.Congtacvien}/${data}`;
    return this.httpClient.delete(deleteCongtacvienAPI)  
  }

  updateAllUser(data): Observable<any>  {
    const updateAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.put<any>(updateAllUserAPI, data,this.httpOptions)  
  }

  updateAllOldUser(data): Observable<any>  {
    const updateAllOldUserAPI = `${NETWORK.API.ACCOUNT}`;
    return this.httpClient.put<any>(updateAllOldUserAPI, data,this.httpOptions)  
  }

  updateAllCongtacvien(data): Observable<any>  {
    const updateAllCongtacvienAPI = `${NETWORK.API.Congtacvien}`;
    return this.httpClient.put<any>(updateAllCongtacvienAPI, data,this.httpOptions)  
  }

 
     
  

}
