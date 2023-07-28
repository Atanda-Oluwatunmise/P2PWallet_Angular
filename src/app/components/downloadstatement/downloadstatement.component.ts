import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AllTransactionsComponent } from '../all-transactions/all-transactions.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-downloadstatement',
  templateUrl: './downloadstatement.component.html',
  styleUrls: ['./downloadstatement.component.css']
})
export class DownloadstatementComponent {
  public selectedCurrency: any;
  public startDate: any;
  public endDate: any;
  public transactionType: any;
  public downloadDto: any = {
    fromDate: "",
    toDate: "",
    txnType: "",
    currency: ""
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: any ,public modalDialog: MatDialogRef<DownloadstatementComponent>, public api : ApiService, public router: Router)
  {
    //this.selectedCurrency = data.fromDate;
    this.startDate = data.fromDate;
    this.endDate = data.toDate;
  }


  onSubmit(){
    console.log(this.startDate);
    console.log(this.endDate);
    // console.log(this.data.startDate);
    // console.log(this.data.endDate);
  }
  closeModal() {
    this.modalDialog.close();
    // console.log(this.data.allval);
  }

  DownloadPdf() {
    const checkbox1 = document.getElementById('inlineRadio1') as HTMLInputElement | null;
    const checkbox2 = document.getElementById('inlineRadio2') as HTMLInputElement | null;
    const checkbox3 = document.getElementById('inlineRadio3') as HTMLInputElement | null;
    if (checkbox1?.checked) {
      this.transactionType = document.getElementById('inlineRadio1');
      this.transactionType = this.transactionType.value;
      console.log(this.transactionType);
    }
    else if (checkbox2?.checked) {
      this.transactionType = document.getElementById('inlineRadio2');
      this.transactionType = this.transactionType.value;
      console.log(this.transactionType);
    }
    else if (checkbox3?.checked) {
      this.transactionType = document.getElementById('inlineRadio3');
      this.transactionType = this.transactionType.value;
      console.log(this.transactionType);
    }
    else {
      console.log("No checkbox was clicked");
    }
    this.downloadDto["fromDate"] = this.startDate;
    this.downloadDto["toDate"] = this.endDate;
    this.downloadDto["txnType"] = this.transactionType;
    this.downloadDto["currency"] = this.selectedCurrency;
    console.log(this.downloadDto);
    this.api.downloadTransactions(this.downloadDto)
    .subscribe((res)=> {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
      this.modalDialog.close();
    })
  }

}
