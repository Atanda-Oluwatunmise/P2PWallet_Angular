import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})

export class AllTransactionsComponent {
  public users:any = [];
  public tabledata:any = [];
  public firstName:any;
  public searchText: any;
  public page: number = 1;
  public count: number = 0;
  public tableSize: number = 5;
  public tableSizes: any = [5, 10, 15, 20];
  public dateofTransaction: Date = new Date();
  public dateObj: any;
  public dateOne: string ="";
  public startDate: any;
  public endDate: any;
  public dateTwo: string = "";
  public element: any;
  public transactionType: any;
  public arrays = []

   
   constructor(private api: ApiService, private auth: AuthService, private toastr: ToastrService, public datepipe: DatePipe, private router: Router, private matdialog: MatDialog){
   }
  
    ngOnInit(){
      this.postList();
    }
  
    postList(): void{

      this.api.getuserDetails()
      .subscribe(res=> {
        console.log(res)
  
        this.users = res.data;
      })

      // this.api.getTransactionHistory()
      // //this.api.getRecentTransactions()
      // .subscribe(res =>{
      //   console.log(res.data)
      //   this.tabledata = res.data
      //   this.dateofTransaction = new Date();
      // })
    }
  
    onTableDataChange(event: any){
      this.page = event;
      //this.postList();
    }
  
    onTableSizeChange(event: any): void{
      this.tableSize = event.target.value;
      this.page = 1;
      this.postList();
    }
  
    key:string = 'id';
    reverse:boolean = false;
    sort(key:any){
      this.key = key
      this.reverse = !this.reverse;
    } 

    getTxnsByDate(details:{startDate: string, endDate: string}){
      console.log(details);
      this.api.getTransactionsByDate(details)
      .subscribe((res:any)=> {
        console.log(res);
        if(res.data === null){
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

    allTransactions(){
      // this.element = document.getElementById("displayErr");
      // this.element.style.display = "none";
      // this.element = document.getElementById("displayTable");
      // this.element.style.display = "";
      // this.api.getTransactionHistory()
      // .subscribe((res:any)=>{
      //   this.tabledata = res.data;
      //   this.arrays = res.data;
      //   console.log(this.arrays);
      console.log(this.tabledata);
      this.tabledata = this.arrays;
      }

    

    tempArray: any =[];
    newArray: any =[];
    creditTransactions(){
      this.tempArray = this.arrays.filter((e:any) => e.transType == 'CREDIT');
      console.log(this.tempArray);
      this.tabledata = this.tempArray;
    }

    debitTransactions(){
      this.tempArray = this.arrays.filter((e:any) => e.transType == 'DEBIT');
      console.log(this.tempArray);
      this.tabledata = this.tempArray;
    }

    downloadHistory(){
      this.api.downloadTransactions()
      .subscribe((res) => {
        let blob: Blob = res.body as Blob;
        let url = window.URL.createObjectURL(blob);
        window.open(url);
        //console.log(res);

        // let a = document.createElement('a');
        // a.download = url;
        // a.href = url;
        // a.click();
      })
    }
}