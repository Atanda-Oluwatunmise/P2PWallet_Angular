import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token.api.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl: string = "http://localhost:5127/api/";
  private userbaseUrl: string = "http://localhost:5127/api/User/";
  private notificationbaseUrl: string = "http://localhost:5127/api/Notification/";
  private kycprocessbaseUrl: string = "http://localhost:5127/api/KycProcess/";
  private transactionBaseUrl: string = "http://localhost:5127/api/Transactions/";
  private authenticationUrl: string = "http://localhost:5127/api/Authentication/";
  private paymentUrl: string = "http://localhost:5127/api/Payment/";
  // private postBody: string ="";

  //inject the httpclient
  constructor(private http: HttpClient, private router: Router) { }

  uploadImage(imgobj: any) {
    return this.http.post(`${this.userbaseUrl}uploadimage`, imgobj);
  }

  verifyImageStatus() {
    return this.http.get<any>(`${this.userbaseUrl}verifyimagestatus`);
  }

  displayImage() {
    return this.http.get<any>(`${this.userbaseUrl}displayimage`);
  }

  getuserDetails() {
    return this.http.get<any>(`${this.userbaseUrl}accountdetails`);
  }

  getuserAccountDetails(acctobj: any) {
    return this.http.post(`${this.userbaseUrl}userdetails`, acctobj);
  }
  getuserForeignAccountDetails(acctobj: any) {
    return this.http.post(`${this.userbaseUrl}foreignuserdetails`, acctobj);
  }

  editInfo(infoobj: any) {
    return this.http.put(`${this.userbaseUrl}editinfo`, infoobj);
  }

  verifyCurrency(currency: any) {
    return this.http.post(`${this.userbaseUrl}verifycurrency`, currency);
  }

  createNewWallet(currency: any) {
    return this.http.post(`${this.userbaseUrl}createnewwallet`, currency);
  }

  verifyAccount(currency: any) {
    return this.http.post(`${this.userbaseUrl}verifyaccount`, currency);
  }

  deleteImage() {
    return this.http.delete(`${this.userbaseUrl}deleteimage`);
  }

  getTransactionHistory() {
    return this.http.get<any>(`${this.transactionBaseUrl}transactionshistory`);
  }

  getRecentTransactions() {
    return this.http.get<any>(`${this.transactionBaseUrl}recenttransactions`);
  }

  getTransactionsByDate(detailsObj: any) {
    return this.http.post(`${this.transactionBaseUrl}usertransactionsbydate`, detailsObj);
  }

  downloadTransactions(pdfdto: any) {
    return this.http.post(`${this.transactionBaseUrl}generatepdf`, pdfdto, { responseType: 'blob', observe: 'response' }).pipe(
    )
  };
  GeneratePdfTransactionsStatement(pdfdto: any) {
    return this.http.post(`${this.transactionBaseUrl}generateemailpdf`, pdfdto);
  };
  GenerateEXLTransactionsStatement(pdfdto: any) {
    return this.http.post(`${this.transactionBaseUrl}generateexcel`, pdfdto);
  };

  ConvertCurrency(currencydto: any) {
    return this.http.post(`${this.transactionBaseUrl}convertcurrency`, currencydto);
  };

  FundForeignAccount(currencydto: any) {
    return this.http.post(`${this.transactionBaseUrl}fundforeignwallet`, currencydto);
  };

  ForeignAccountTransfers(transferdto: any) {
    return this.http.post(`${this.transactionBaseUrl}foreignwallettransfers`, transferdto);
  };

  createUserPin(pinObj: any) {
    return this.http.post(`${this.authenticationUrl}createpin`, pinObj);
  }

  verifyUserPin(verifyPinObj: any) {
    return this.http.post(`${this.authenticationUrl}verifypin`, verifyPinObj);
  }

  transfer(txnObj: any) {
    return this.http.put(`${this.transactionBaseUrl}transfers`, txnObj);
  }

  addSecurityDetail(securityObj: any) {
    return this.http.post(`${this.authenticationUrl}addsecuritydetail`, securityObj);
  }

  validateuserPin() {
    return this.http.get<any>(`${this.authenticationUrl}validateuser`);
  }

  changePin(changepinObj: any) {
    return this.http.post(`${this.authenticationUrl}changepin`, changepinObj);
  }

  chagePassword(changepasswordObj: any) {
    return this.http.post(`${this.authenticationUrl}changepassword`, changepasswordObj);
  }

  getSecurityDetail() {
    return this.http.get<any>(`${this.authenticationUrl}getsecuritydetail`);
  }

  initializePayment(paymentobj: any) {
    return this.http.post(`${this.paymentUrl}initializepayment`, paymentobj);
  }
  getNotificationDetail(referenceObj: any) {
    return this.http.post(`${this.notificationbaseUrl}retrievenotification`, referenceObj);
  }
  getUnreadNotification() {
    return this.http.get<any>(`${this.notificationbaseUrl}unreadnotification`);
  }

  getListofKycDocs() {
    return this.http.get<any>(`${this.kycprocessbaseUrl}kycdocumentlist`);
  }

  kycFileUpload(fileObj: any){
    return this.http.post(`${this.kycprocessbaseUrl}uploadkycdocument`, fileObj);
  }

  kycUpgrade(){
    return this.http.get<any>(`${this.kycprocessbaseUrl}upgradeuseraccount`);
  }

  unUploadedoRRejectedDocs(){
    return this.http.get<any>(`${this.kycprocessbaseUrl}unuploadeddocs`);
  }
  setNotificationToTrue(msgObj: any){
    return this.http.post(`${this.notificationbaseUrl}setnotificationtotrue`, msgObj);
  }
}
