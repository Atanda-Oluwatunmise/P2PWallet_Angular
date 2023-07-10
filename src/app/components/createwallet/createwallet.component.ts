import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createwallet',
  templateUrl: './createwallet.component.html',
  styleUrls: ['./createwallet.component.css']
})
export class CreatewalletComponent {
  public currency: any;
  public currencyObj: any =
    {
      currency: ""
    };
  constructor(public dialogRef: MatDialogRef<CreatewalletComponent>, public api: ApiService) { }


  closeModal() {
    this.dialogRef.close();
  }

  VerifyCurrency() {
    const checkbox1 = document.getElementById('checkBox1') as HTMLInputElement | null;
    const checkbox2 = document.getElementById('checkBox2') as HTMLInputElement | null;
    const checkbox3 = document.getElementById('checkBox3') as HTMLInputElement | null;
    const checkbox4 = document.getElementById('checkBox4') as HTMLInputElement | null;
    if (checkbox1?.checked) {
      this.currency = document.getElementById('checkBox1');
      this.currency = this.currency.value;
      console.log(this.currency);
    }
    else if (checkbox2?.checked) {
      this.currency = document.getElementById('checkBox2');
      this.currency = this.currency.value;
      console.log(this.currency);
    }
    else if (checkbox3?.checked) {
      this.currency = document.getElementById('checkBox3');
      this.currency = this.currency.value;
      console.log(this.currency);
    }
    else if (checkbox4?.checked) {
      this.currency = document.getElementById('checkBox4');
      this.currency = this.currency.value;
      console.log(this.currency);
    }
    else {
      console.log("No checkbox was clicked");
    }
    this.currencyObj["currency"] = this.currency;
    this.api.verifyCurrency(this.currencyObj)
      .subscribe((res: any) => {
        console.log(res)
        if (res.status == true) {
          Swal.fire({
            title: 'Info!',
            showDenyButton: true,
            confirmButtonText: 'Proceed',
            denyButtonText: 'Cancel',
            text: 'Your Account will be charged NGN' + res.data,
            confirmButtonColor: '#53277E',
            icon: 'question'
          }).then((result) => {
            if (result.isConfirmed) {
              this.api.createNewWallet(this.currencyObj)
                .subscribe((res: any) => {
                  if (res.status != true) {
                    Swal.fire({
                      title: res.data,
                      confirmButtonColor: '#53277E',
                      icon: 'info'
                    })
                    this.dialogRef.close();
                  }
                  else {
                    Swal.fire({
                      title: 'Success',
                      text: res.statusMessage,
                      confirmButtonColor: '#53277E',
                      icon: 'success'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.reload();
                      }
                    })
                  }
                })
                this.dialogRef.close();
            } else if (result.isDenied) {
              this.dialogRef.close();
            }
          })
        }
        //this.dialogRef.close();
      })
    // this.currency = document.getElementById('checkBox');
    // this.currency = this.currency.value;
    // console.log(this.currency);
  }
}
