import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { GeneratestatementComponent } from '../generatestatement/generatestatement.component';
import { DownloadstatementComponent } from '../downloadstatement/downloadstatement.component';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})

export class AllTransactionsComponent {
  public users: any = [];
  public tabledata: any = [];
  public firstName: any;
  public searchText: any;
  public page: number = 1;
  public count: number = 0;
  public tableSize: number = 5;
  public tableSizes: any = [5, 10, 15, 20];
  public dateofTransaction: Date = new Date();
  public dateObj: any;
  public dateOne: string = "";
  public startDate: any;
  public endDate: any;
  public dateTwo: string = "";
  public element: any;
  public transactionType: any;
  public arrays = []
  public creditValue: any;
  public debitValue: any;
  public defaultValue: any;
  public pdfDto = {
    "fromDate": "",
    "toDate": "",
    "txnType": ""
  }
  public searchicon: any;
  public card: any;
  public allval = (<HTMLInputElement>document.getElementById("creditHistory")) as HTMLInputElement | null;
  public all = this.allval?.value;
  public creditval = (<HTMLInputElement>document.getElementById("creditHistory"))as HTMLInputElement | null;
  public credit = this.creditval?.value;
  // public debitval = (<HTMLInputElement>document.getElementById("debitHistory")).value;

  
  constructor(private loader: LoaderService, private api: ApiService, private auth: AuthService, private toastr: ToastrService, public datepipe: DatePipe, private router: Router, private matdialog: MatDialog) {
  }

  ngOnInit() {
    this.postList();
  }

  postList(): void {

    this.api.getuserDetails()
      .subscribe(res => {
        console.log(res)

        this.users = res.data;
      })
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key
    this.reverse = !this.reverse;
  }

  getTxnsByDate(details: { startDate: string, endDate: string }) {
    console.log(details);
    this.api.getTransactionsByDate(details)
      .subscribe((res: any) => {
        this.loader.setLoading(true);
        this.searchicon = document.getElementById("waitingforSearch")
        this.searchicon.style.display = "none";
        this.card = document.getElementById("transactionscard");
        this.card.style.display = "";
        
        console.log(res);
        if (res.data === null) {
          this.loader.getLoading();
          this.element = document.getElementById("displayTable");
          this.element.style.display = "none";
          this.element = document.getElementById("displayErr");
          this.element.style.display = "block";
        }
        else {
          this.element = document.getElementById("displayErr");
          this.element.style.display = "none";
          this.tabledata = res.data;
          this.arrays = res.data;
          console.log(this.arrays);
          this.element = document.getElementById("displayTable");
          this.element.style.display = "";
        }
      })
  }

  allTransactions() {
   
    console.log(this.tabledata);
    this.tabledata = this.arrays;
  }

  tempArray: any = [];
  newArray: any = [];
  creditTransactions() {
    this.tempArray = this.arrays.filter((e: any) => e.transType == 'CREDIT');
    console.log(this.tempArray);
    this.tabledata = this.tempArray;
  }

  debitTransactions() {
    this.tempArray = this.arrays.filter((e: any) => e.transType == 'DEBIT');
    console.log(this.tempArray);
    this.tabledata = this.tempArray;
  }

  downloadHistory() {
    // this.api.downloadTransactions()
    // .subscribe((res) => {
    //   let blob: Blob = res.body as Blob;
    //   let url = window.URL.createObjectURL(blob);
    //   window.open(url);
    //console.log(res);

    // let a = document.createElement('a');
    // a.download = url;
    // a.href = url;
    // a.click();
    //})
  }

  generatecredithistory() {
    this.creditValue = document.getElementById("creditHistory");
    this.creditValue = this.creditValue.value;
    console.log(this.creditValue);
    this.pdfDto["fromDate"] = this.startDate;
    this.pdfDto["toDate"] = this.endDate;
    this.pdfDto["txnType"] = this.creditValue;
    console.log(this.pdfDto);

    this.api.downloadTransactions(this.pdfDto)
      .subscribe((res) => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      )
  }
  generatedebithistory() {
    this.debitValue = document.getElementById("debitHistory");
    this.debitValue = this.debitValue.value;
    console.log(this.debitValue);
    this.pdfDto["fromDate"] = this.startDate;
    this.pdfDto["toDate"] = this.endDate;
    this.pdfDto["txnType"] = this.debitValue;
    console.log(this.pdfDto);

    this.api.downloadTransactions(this.pdfDto)
      .subscribe((res) => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      )
  }
  generateallhistory() {
    this.defaultValue = document.getElementById("allHistory");
    this.defaultValue = this.defaultValue.value;
    console.log(this.defaultValue);
    this.pdfDto["fromDate"] = this.startDate;
    this.pdfDto["toDate"] = this.endDate;
    this.pdfDto["txnType"] = this.defaultValue;
    console.log(this.pdfDto);

    this.api.downloadTransactions(this.pdfDto)
      .subscribe((res) => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      )
  }

  openModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    // dialogConfig.id = "generatestatement";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const newmodalDialog = this.matdialog.open(GeneratestatementComponent, dialogConfig);

  }

  openDownloadModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "downloadstatement";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data= {
        fromDate : this.startDate,
        toDate: this.endDate,
        //creditType: this.creditValue,
        //"deditType": this.debitval,
        // "allType": this.allval
  };

    const modalDialog = this.matdialog.open(DownloadstatementComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
  ); 
  }

}