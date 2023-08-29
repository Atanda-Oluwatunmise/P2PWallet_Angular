import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserchatsComponent } from '../userchats/userchats.component';
import { ChatboxComponent } from '../chatbox/chatbox.component';
import { OutsidechatboxComponent } from '../outsidechatbox/outsidechatbox.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent {
  public email: any;
  public otp: any;

  public emailVerifyDto: any = {
    email: ""
  }

  public otpVerifyDto: any ={
    email: "",
    otp: ""
  }


constructor(private api: ApiService, private matdialog: MatDialog){}


VerifyEmail(){
  this.emailVerifyDto["email"] = this.email;
  this.api.VerifyEmail(this.emailVerifyDto)
  .subscribe((res:any) => {
    console.log(res);
  })
}



openChatBox(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.id = "chat";
  dialogConfig. height = "465px";
  dialogConfig.width = "1000px";
  
  const chatmodalDialog = this.matdialog.open(OutsidechatboxComponent, dialogConfig);
}

}
