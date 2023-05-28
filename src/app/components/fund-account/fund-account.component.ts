import { Component, SecurityContext } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
declare var window: any;
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class FundAccountComponent {

  public url= "";
  public users: any = [];
  public amount: any;
  public paymentObj: any ={
    amount: ""
  }
  formModal: any;

  constructor(private api: ApiService, private matdialog: MatDialog, public sanitizer: DomSanitizer){}

  ngOnInit(): void{
    this.api.getuserDetails()
    .subscribe(res=> {
      console.log(res)
      this.users = res.data;
    })

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModalToggle2')
    )
  }

fundAccount(){
  this.paymentObj['amount']= this.amount
  this.api.initializePayment(this.paymentObj)
  .subscribe((res: any)=>{
    console.log(res);
    if (res.status == true){
      //window.open(res.data.data.authorization_url);
      this.url = res.data.data.authorization_url;
      this.sanitizer.sanitize(SecurityContext.URL, this.url)
      console.log(this.url);
      //this.formModal.show();
      //this.matdialog.open(res.data.data.authorization_url);
    }
  })
}
}
