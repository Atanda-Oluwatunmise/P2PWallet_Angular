import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

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


 logout(){
  this.auth.logout();
 }

}
