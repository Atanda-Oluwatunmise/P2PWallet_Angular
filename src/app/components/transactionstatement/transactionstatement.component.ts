import { Component } from '@angular/core';

@Component({
  selector: 'app-transactionstatement',
  templateUrl: './transactionstatement.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class TransactionstatementComponent {
 public startDate : any;
 public endDate: any;
  constructor(){}
}
