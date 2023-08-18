import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatboxComponent {
  public message: any;
  public chatuserName: any;
  public users: any;
  public username: any;
  public userMsg: any;
  public elementOne: any;
  public elementTwo: any;
  public elementThree: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<DashboardComponent>, public api: ApiService, public signalr: SignalrService) {}

  ngOnInit(){
    this.signalr.startConnection();
    this.api.getuserDetails()
    .subscribe((res:any)=> {
      console.log(res);
      this.users = res.data;
      this.username = this.users[0].username;
    })

    this.signalr.receiveMessage((user, msg, time)=>{
      const uniqueNumber = new Date().getTime()
      const innerdivId = `innerReceiverDiv${uniqueNumber}`;
      const outerdivId = `outerReceiverDiv${uniqueNumber}`;
      const mainDivId = `mainReceiverDiv${uniqueNumber}`;
      if(this.username != user){
      var outerdiv = document.createElement("div");
      outerdiv.classList.add("row", "no-gutters");
      outerdiv.id= outerdivId;
      this.elementOne = document.getElementById("chatPanel");  
      this.elementOne.appendChild(outerdiv);

      var innerdiv = document.createElement("div");
      innerdiv.classList.add("col-md-3");
      innerdiv.id= innerdivId;
      this.elementTwo = document.getElementById(outerdivId);
      this.elementTwo.appendChild(innerdiv);

      var maindiv = document.createElement("div");
      maindiv.classList.add("chat-bubble", "chat-bubble--left");
      maindiv.id= mainDivId;
      maindiv.innerHTML = `<h5>${time}</h5>`;
      maindiv.innerText = msg;
      this.elementThree = document.getElementById(innerdivId);
      this.elementThree.appendChild(maindiv);  
      }
    })    
    }
  

  sendMessage(){
    this.signalr.invokeConnection(this.username, this.message);
    this.elementOne= document.getElementById("inputBox");
    this.elementOne.value = '';
    const uniqueNumber = new Date().getTime()
    const innerdivId = `innerSenderDiv${uniqueNumber}`;
    const outerdivId = `outerSenderDiv${uniqueNumber}`;
    const mainDivId = `mainSenderDiv${uniqueNumber}`;
    var outerdiv = document.createElement("div");
    outerdiv.classList.add("row", "no-gutters");
    outerdiv.id= outerdivId;
    this.elementOne = document.getElementById("chatPanel");
    this.elementOne.appendChild(outerdiv);

    var innerdiv = document.createElement("div");
    innerdiv.classList.add("col-md-3", "offset-md-9");
    innerdiv.id= innerdivId;
    this.elementTwo = document.getElementById(outerdivId);
    this.elementTwo.appendChild(innerdiv);

    var maindiv = document.createElement("div");
    maindiv.classList.add("chat-bubble", "chat-bubble--right");
    maindiv.id= mainDivId;
    maindiv.innerText = this.message;
    this.elementThree = document.getElementById(innerdivId);
    this.elementThree.appendChild(maindiv);
  }

  closeModal(){
    this.modalDialog.close()
  }
  
}
