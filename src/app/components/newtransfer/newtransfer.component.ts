import { Component, Inject } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-newtransfer',
  templateUrl: './newtransfer.component.html',
  styleUrls: ['./newtransfer.component.css']
})
export class NewtransferComponent {
  public rowdata: any;
  public receiverDetails: any;
  public amount: any;
  public currency: any;
  public accountSearch: any;
  public Deatails: any = [];
  public transferDto: any = {
    accountSearch: "",
    currency: "",
    amount: ""
  };
  public foreignpin: any;
  public pinObect: any = {
    userPin: ""
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<DashboardComponent>, public api: ApiService, public router: Router) {
    this.rowdata = data;
  }
  ngOnInit(): void {
    console.log(this.rowdata);
    var str = new String(this.rowdata.receiverInfo);
    var splits = str.split(" - ", 2)
    console.log(splits);
    //this.receiverDetails = splits;
    this.receiverDetails = Object.assign({}, splits);
    console.log(this.receiverDetails);
    this.Deatails = this.receiverDetails;
    console.log(this.Deatails);

    for (const k in this.Deatails) {
      if (k === "0") {
        this.Deatails["username"] = this.Deatails[k];
        delete this.Deatails[k];
      }
      if (k === "1") {
        this.Deatails["accountnumber"] = this.Deatails[k];
        delete this.Deatails[k];
      }
    }
    console.log(this.Deatails);
  }

  
  

  transferMoney() {
    this.accountSearch = document.getElementById("accountnumber");
    this.accountSearch = this.accountSearch.value;
    this.currency = document.getElementById("currency");
    this.currency = this.currency.value;
    this.transferDto["accountSearch"] = this.accountSearch;
    this.transferDto["currency"] = this.currency;
    this.transferDto["amount"] = this.amount;

    Swal.fire({
      title: 'Enter your pin',
      html: `<input type="password" id="pin" class="swal2-input" placeholder="Pin">`,

      focusConfirm: false,
      confirmButtonText: 'Submit',
      confirmButtonColor: '#53277E',
      preConfirm: () => {
        this.foreignpin = Swal.getPopup()?.querySelector('#pin') as HTMLButtonElement | null;
        this.foreignpin = this.foreignpin.value;
        console.log(this.foreignpin);
        this.pinObect["userPin"] = this.foreignpin;
        this.api.verifyUserPin(this.pinObect)
          .subscribe((res: any) => {
            if (res.status != true) {
              Swal.fire({
                title: 'Error!',
                text: 'Pin Not Correct! :)',
                icon: 'error',
                confirmButtonColor: '#53277E'
              })
            }
            if (res.status == true) {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#53277E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Make Transfer!'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.api.ForeignAccountTransfers(this.transferDto)
                    .subscribe((res: any) => {
                      if (res.status != true) {
                        Swal.fire({
                          title: 'Error!',
                          text: res.statusMessage,
                          icon: 'error',
                          confirmButtonColor: '#53277E'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            window.location.reload();
                          }
                        })
                      }
                      else {
                        Swal.fire({
                          title: 'Success!',
                          text: res.data,
                          confirmButtonColor: '#53277E',
                          icon: 'success',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            window.location.reload();
                          }
                        })
                      }
                    })
                }
              })
            }
          })
      }
      
    })



  }

  closeModal() {
    this.modalDialog.close();
  }
}
