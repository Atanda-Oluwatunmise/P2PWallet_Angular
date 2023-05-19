import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class ModalPopupComponent {
  public question: string = "";
  public answer: string = "";
  public pinObect: any = {
    userPin: ""
  };
  
  constructor(private api: ApiService, private router: Router, private matdialog: MatDialog){}

  onCreatePin(pindetails: { userPin: string, confirmpin: string, question: string, answer: string }) {
    console.log(pindetails);
    console.log(pindetails.userPin);
    this.pinObect["userPin"] = pindetails.userPin;
    this.api.createUserPin(this.pinObect)
      .subscribe((res:any) => {
        console.log(res)
        if (res.status == true) {
          this.addSecurityDetail({ question: pindetails.question, answer: pindetails.answer });      
        }
      })
  }

  addSecurityDetail(securitydetails: any) {
    console.log(securitydetails);
    this.api.addSecurityDetail(securitydetails)
      .subscribe((res: any) => {
        console.log(res)
        if(res.status === true){
          this.matdialog.closeAll();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Pin Created Successfully',
            confirmButtonColor: "#53277E"  
          })
        }
      })
  }
}
