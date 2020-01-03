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

  getAllAccount() {
    const getAllAccountAPI = `${NETWORK.API.ACCOUNT}`;
    return this.httpClient.get<any>(getAllAccountAPI);    
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

  deleteUser(data): Observable<any>  {
    const deleteUserAPI = `${NETWORK.API.WiFi}/${data}`;
    return this.httpClient.delete(deleteUserAPI)  
  }

  updateAllUser(data): Observable<any>  {
    const updateAllUserAPI = `${NETWORK.API.WiFi}`;
    return this.httpClient.put<any>(updateAllUserAPI, data,this.httpOptions)  
  }

 
     
  

}
