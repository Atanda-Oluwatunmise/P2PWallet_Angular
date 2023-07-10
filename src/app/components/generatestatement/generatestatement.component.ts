import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generatestatement',
  templateUrl: './generatestatement.component.html',
  styleUrls: ['./generatestatement.component.css']
})
export class GeneratestatementComponent {

  public startDate: any;
  public endDate: any;
  public selectedCurrency: any;
  public statementDto: any = {
    "startDate": "",
    "endDate": "",
    "currency": ""
  }

  constructor(public dialogRef: MatDialogRef<GeneratestatementComponent>, public api : ApiService, public router: Router, private loader: LoaderService){}

  closeModal() {
    this.dialogRef.close();
  }

  generatePdfStatement(){
    this.statementDto["startDate"] = this.startDate;
    this.statementDto["endDate"] = this.endDate;
    this.statementDto["currency"] = this.selectedCurrency;
    console.log(this.statementDto);

    this.api.GeneratePdfTransactionsStatement(this.statementDto)
    .subscribe((res:any) => {
      console.log(res);
      if (res.status === true){
        Swal.fire({
          title: 'Success!',
          text: 'Transactions statement has been sent to your email!',
          confirmButtonColor: '#53277E',
          icon: 'success',
        });
        this.dialogRef.close();
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: 'Transactions statement cannot be sent to your email!',
          confirmButtonColor: 'red',
          icon: 'error',
        });
        this.dialogRef.close();
      }
    })
    this.router.navigate(['alltransactions']);
  }

  generateExcelStatement(){
    this.loader.setLoading(true);
    this.statementDto["startDate"] = this.startDate;
    this.statementDto["endDate"] = this.endDate;
    this.statementDto["currency"] = this.selectedCurrency;
    console.log(this.statementDto);

    this.api.GenerateEXLTransactionsStatement(this.statementDto)
    .subscribe((res:any) => {
      this.loader.getLoading();
      console.log(res);
      if (res.status === true){
        Swal.fire({
          title: 'Success!',
          text: 'Transactions statement has been sent to your email!',
          confirmButtonColor: '#53277E',
          icon: 'success',
        });
        this.dialogRef.close();
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: 'Transactions statement cannot be sent to your email!',
          confirmButtonColor: 'red',
          icon: 'error',
        });
        this.dialogRef.close();
      }
    })
    this.router.navigate(['alltransactions']);
  }

}
