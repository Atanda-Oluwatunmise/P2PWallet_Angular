import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { CreatewalletComponent } from '../createwallet/createwallet.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
public users:any = [];
public tabledata:any = [];
public firstName:any;
public searchText: any;
public page: number = 1;
public count: number = 0;
public tableSize: number = 5;
public tableSizes: any = [5, 10, 15, 20];
public dateofTransaction: Date = new Date();
public currencyObj: any = {
  currency: ""
};
public usdId: any;
 
 constructor(private api: ApiService, private auth: AuthService, private toastr: ToastrService, public datepipe: DatePipe, private router: Router, private matdialog: MatDialog){
 }

  ngOnInit(){
    this.postList();
  }


  postList(): void{
    this.api.validateuserPin()
    .subscribe((res)=>{
      console.log(res);
        if(res.status != true){
          console.log("user has created pin")
        }
      else if(res.status == true){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: true,
          confirmButtonText: 'Okay!',
          confirmButtonColor: "#53277E",
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Create your pin'
        }).then((result) => {
          if(result.isConfirmed){
            this.openPopup();
          }
        })
      }
    })    

    this.api.getuserDetails()
    .subscribe(res=> {
      console.log(res)

      this.users = res.data;
    })

    // this.api.getTransactionHistory()
    this.api.getRecentTransactions()
    .subscribe(res =>{
      console.log(res.data)
      this.tabledata = res.data
      this.dateofTransaction = new Date();
    })

      this.currencyObj["currency"] = "USD";
      this.api.verifyAccount(this.currencyObj)
      .subscribe((res:any) => {
        if(res.status == true){
           this.usdId = document.getElementById("usdDisplay");
           this.usdId.style.display = "";
        }
      })
      this.currencyObj["currency"] = "EUR";
      this.api.verifyAccount(this.currencyObj)
      .subscribe((res:any) => {
        if(res.status == true){
           this.usdId = document.getElementById("eurDisplay");
           this.usdId.style.display = "";
        }
      })
      this.currencyObj["currency"] = "GBP";
      this.api.verifyAccount(this.currencyObj)
      .subscribe((res:any) => {
        if(res.status == true){
           this.usdId = document.getElementById("gbpDisplay");
           this.usdId.style.display = "";
        }
      })
  }

  onTableDataChange(event: any){
    this.page = event;
    this.postList();
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

  goToTransactionsPage(){
    this.router.navigate(["alltransactions"]);
  }

openPopup(){
  this.matdialog.open(ModalPopupComponent, { panelClass: 'mat-mdc-dialog-container' });
}

openModal(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.id = "createwallet";
  dialogConfig.height = "380px";
  dialogConfig.width = "400px";
  const modalDialog = this.matdialog.open(CreatewalletComponent, dialogConfig);
}

ViewNGNDetail(){
  this.currencyObj["currency"] = "NGN";
  this.api.verifyAccount(this.currencyObj)
  .subscribe((res:any) => {
    if(res.status == true){
       this.users = res.data;
    }
  })
}

ViewUSdDetail(){
  this.currencyObj["currency"] = "USD";
  this.api.verifyAccount(this.currencyObj)
  .subscribe((res:any) => {
    if(res.status == true){
       this.users = res.data;
    }
  })
}

ViewEurDetail(){
  this.currencyObj["currency"] = "EUR";
  this.api.verifyAccount(this.currencyObj)
  .subscribe((res:any) => {
    if(res.status == true){
       this.users = res.data;
    }
  })
}

ViewGbpDetail(){
  this.currencyObj["currency"] = "GBP";
  this.api.verifyAccount(this.currencyObj)
  .subscribe((res:any) => {
    if(res.status == true){
       this.users = res.data;
    }
  })
}

 logout(){
  this.auth.logout();
 }

}
