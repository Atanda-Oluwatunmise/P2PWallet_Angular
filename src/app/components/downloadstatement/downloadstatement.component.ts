import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AllTransactionsComponent } from '../all-transactions/all-transactions.component';

@Component({
  selector: 'app-downloadstatement',
  templateUrl: './downloadstatement.component.html',
  styleUrls: ['./downloadstatement.component.css']
})
export class DownloadstatementComponent {
  public selectedCurrency: any;
  constructor(@Inject(MAT_DIALOG_DATA) public transactiondata: AllTransactionsComponent,public dialogRef: MatDialogRef<DownloadstatementComponent>, public api : ApiService, public router: Router){}

  // ngOnInit(){
  //   console.log(this.transactiondata.creditValue);
  //   console.log(this.transactiondata.startDate);
  //   console.log(this.transactiondata.endDate);
  // }

  closeModal() {
    this.dialogRef.close();
    // console.log(this.data.allval);
  }
}
