import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userbaseUrl:string = "http://localhost:5127/api/User/";
  private transactionBaseUrl:string = "http://localhost:5127/api/Transactions/";
  private authenticationUrl:string = "http://localhost:5127/api/Authentication/";
  private paymentUrl:string = "http://localhost:5127/api/Payment/";
  // private postBody: string ="";

  //inject the httpclient
  constructor(private http: HttpClient, private router: Router) { }

  uploadImage(imgobj: any){
    return this.http.post(`${this.userbaseUrl}uploadimage`, imgobj);
  }

  verifyImageStatus(){
    return this.http.get<any>(`${this.userbaseUrl}verifyimagestatus`);
  }
  displayImage(){
    return this.http.get<any>(`${this.userbaseUrl}displayimage`);
  }
  getuserDetails(){
    return this.http.get<any>(`${this.userbaseUrl}accountdetails`);
  }
  getuserAccountDetails(acctobj: any){
    return this.http.post(`${this.userbaseUrl}userdetails`, acctobj);
  }

  editInfo(infoobj: any){
    return this.http.put(`${this.userbaseUrl}editinfo`, infoobj);
  }

  deleteImage(){
    return this.http.delete(`${this.userbaseUrl}deleteimage`);
  }
  
  getTransactionHistory(){
    return this.http.get<any>(`${this.transactionBaseUrl}transactionshistory`);
  }

  createUserPin(pinObj: any){
    return this.http.post(`${this.authenticationUrl}createpin`, pinObj);
  }

  verifyUserPin(verifyPinObj: any){
    return this.http.post(`${this.authenticationUrl}verifypin`,verifyPinObj);
  }

  transfer(txnObj: any){
    return this.http.put(`${this.transactionBaseUrl}transfers`, txnObj);
  }

  addSecurityDetail(securityObj: any){
    return this.http.post(`${this.authenticationUrl}addsecuritydetail`, securityObj);
  }

  validateuserPin(){
    return this.http.get<any>(`${this.authenticationUrl}validateuser`);
  }

  initializePayment(paymentobj: any){
    return this.http.post(`${this.paymentUrl}initializepayment`, paymentobj);
  }
}
