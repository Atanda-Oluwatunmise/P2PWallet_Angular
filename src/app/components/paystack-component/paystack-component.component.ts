import { Component } from '@angular/core';

@Component({
  selector: 'app-paystack-component',
  templateUrl: './paystack-component.component.html',
  styleUrls: ['./paystack-component.component.css']
})
export class PaystackComponentComponent {
  public url = "";
  constructor(){}

  loadUrl(param:any){
    return param;
  }

}
