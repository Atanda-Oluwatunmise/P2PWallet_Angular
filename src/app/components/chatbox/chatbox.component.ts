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
  public element: any;
  public elementOne: any;
  public elementTwo: any;
  public elementThree: any;
  public messageObj: any = {
    Username: "",
    Message: ""
  }

  public oldMesssagesObj: any = {
    senderUserName: "tom",
    receiverUserName: "Admin"
  }

  public startChatObj: any = {
    senderUserName: "",
    receiverUserName: ""
  }

  public allMsgs: any;
  public messageDateString: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<DashboardComponent>, public api: ApiService, public signalr: SignalrService) { }

  ngOnInit() {
    this.signalr.startConnection();
    this.api.getuserDetails()
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.data;
        this.username = this.users[0].username;
      })

      this.getAdminChats();

    this.signalr.receiveMessage((user, msg, time) => {
      const uniqueNumber = new Date().getTime()
      const innerdivId = `innerReceiverDiv${uniqueNumber}`;
      const outerdivId = `outerReceiverDiv${uniqueNumber}`;
      const mainDivId = `mainReceiverDiv${uniqueNumber}`;
      if (this.username != user) {
        var outerdiv = document.createElement("div");
        outerdiv.classList.add("row", "no-gutters");
        outerdiv.id = outerdivId;
        this.elementOne = document.getElementById("chatPanel");
        this.elementOne.appendChild(outerdiv);

        var innerdiv = document.createElement("div");
        innerdiv.classList.add("col-md-3");
        innerdiv.id = innerdivId;
        this.elementTwo = document.getElementById(outerdivId);
        this.elementTwo.appendChild(innerdiv);

        var maindiv = document.createElement("div");
        maindiv.classList.add("chat-bubble", "chat-bubble--left");
        maindiv.id = mainDivId;
        maindiv.innerHTML = `<p>${msg}</p>
      <span>${time}</span>`;
        //maindiv.innerText = msg;
        this.elementThree = document.getElementById(innerdivId);
        this.elementThree.appendChild(maindiv);
      }
    })
  }

  getAdminChats(){
    this.api.getuserDetails()
    .subscribe((res: any) => {
      this.startChatObj["senderUserName"] = res.data[0].username;
      this.startChatObj["receiverUserName"] = "Admin";
      this.startConversation(this.startChatObj);
    })
  }


  sendMessage() {
    this.messageObj["Username"] = this.username;
    this.messageObj["Message"] = this.message;
    this.api.SendMessage(this.messageObj).subscribe();
    this.elementOne = document.getElementById("inputBox");
    this.elementOne.value = '';
    const uniqueNumber = new Date().getTime()
    const innerdivId = `innerSenderDiv${uniqueNumber}`;
    const outerdivId = `outerSenderDiv${uniqueNumber}`;
    const mainDivId = `mainSenderDiv${uniqueNumber}`;
    var outerdiv = document.createElement("div");
    outerdiv.classList.add("row", "no-gutters");
    outerdiv.id = outerdivId;
    this.elementOne = document.getElementById("chatPanel");
    this.elementOne.appendChild(outerdiv);

    var innerdiv = document.createElement("div");
    innerdiv.classList.add("col-md-3", "offset-md-9");
    innerdiv.id = innerdivId;
    this.elementTwo = document.getElementById(outerdivId);
    this.elementTwo.appendChild(innerdiv);

    var maindiv = document.createElement("div");
    maindiv.classList.add("chat-bubble", "chat-bubble--right");
    maindiv.id = mainDivId;
    var time: any = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    console.log(time);
    maindiv.innerHTML = `<p>${this.message}</p>
    <span class="time">${time}</span>`;
    this.elementThree = document.getElementById(innerdivId);
    this.elementThree.appendChild(maindiv);
  }


  startConversation(messageObj: any) {
    this.api.StartChatting(messageObj)
      .subscribe((res: any) => {
        if (res.status == true) {
          this.allMsgs = res.data;
          console.log(res);
          if(res.data.length == 0){
            this.element = document.getElementById("chatPanel");
            this.element.innerHTML = "";
          }

          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              var dateHolder = document.createElement('div');
              dateHolder.classList.add('centerdate')
              if (i == 0) {
                dateHolder.innerHTML = `<div *ngIf="${this.isDifferentDay(i)}">
            <h4>${this.getMessageDate(i)}</h4>
            </div>`
                this.element = document.getElementById("chatPanel");
                this.element.appendChild(dateHolder);
              }

              if (i !== 0) {
                if (this.getMessageDate(i) != this.getMessageDate(i - 1)) {
                  dateHolder.innerHTML = `<div *ngIf="${this.isDifferentDay(i)}">
            <h4>${this.getMessageDate(i)}</h4>
            </div>`
                  this.element = document.getElementById("chatPanel");
                  this.element.appendChild(dateHolder);
                }
              } if (res.data[i].senderUserName == 'tom') {
                const innerdivId = `innerSenderDiv${i}`;
                const outerdivId = `outerSenderDiv${i}`;
                const mainDivId = `mainSenderDiv${i}`;
                var outerdiv = document.createElement("div");
                outerdiv.classList.add("row", "no-gutters");
                outerdiv.id = outerdivId;
                this.element = document.getElementById("chatPanel");
                this.element.appendChild(outerdiv);

                var innerdiv = document.createElement("div");
                innerdiv.classList.add("col-md-3", "offset-md-9");
                innerdiv.id = innerdivId;
                this.element = document.getElementById(outerdivId);
                this.element.appendChild(innerdiv);

                var maindiv = document.createElement("div");
                maindiv.classList.add("chat-bubble", "chat-bubble--right");
                maindiv.id = mainDivId;
                maindiv.innerHTML = `<p>${res.data[i].chat}</p>
            <span class="time">${res.data[i].chatsDate}</span>`;
                this.element = document.getElementById(innerdivId);
                this.element.appendChild(maindiv);
              }

              if (res.data[i].senderUserName == 'Admin') {
                const innerdivId = `innerSenderDiv${i}`;
                const outerdivId = `outerSenderDiv${i}`;
                const mainDivId = `mainSenderDiv${i}`;
                var outerdiv = document.createElement("div");
                outerdiv.classList.add("row", "no-gutters");
                outerdiv.id = outerdivId;
                this.element = document.getElementById("chatPanel");
                this.element.appendChild(outerdiv);

                var innerdiv = document.createElement("div");
                innerdiv.classList.add("col-md-3");
                innerdiv.id = innerdivId;
                this.element = document.getElementById(outerdivId);
                this.element.appendChild(innerdiv);

                var maindiv = document.createElement("div");
                maindiv.classList.add("chat-bubble", "chat-bubble--left");
                maindiv.id = mainDivId;
                maindiv.innerHTML = `<p>${res.data[i].chat}</p>
            <span class="time">${res.data[i].chatsDate}</span>`;
                this.element = document.getElementById(innerdivId);
                this.element.appendChild(maindiv);
              }
            }
          }
        }
      })
  }

  loadPreviousMessages() {
    this.api.LoadMessages(this.oldMesssagesObj)
      .subscribe((res: any) => {
        this.allMsgs = res.data;
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          var dateHolder = document.createElement('div');
          dateHolder.classList.add('centerdate')
          if (i == 0) {
            dateHolder.innerHTML = `<div *ngIf="${this.isDifferentDay(i)}">
            <h4>${this.getMessageDate(i)}</h4>
            </div>`
            this.element = document.getElementById("chatPanel");
            this.element.appendChild(dateHolder);
          }

          if (i !== 0) {
            if (this.getMessageDate(i) != this.getMessageDate(i - 1)) {
              dateHolder.innerHTML = `<div *ngIf="${this.isDifferentDay(i)}">
            <h4>${this.getMessageDate(i)}</h4>
            </div>`
              this.element = document.getElementById("chatPanel");
              this.element.appendChild(dateHolder);
            }
          } if (res.data[i].senderUserName == 'tom') {
            const innerdivId = `innerSenderDiv${i}`;
            const outerdivId = `outerSenderDiv${i}`;
            const mainDivId = `mainSenderDiv${i}`;
            var outerdiv = document.createElement("div");
            outerdiv.classList.add("row", "no-gutters");
            outerdiv.id = outerdivId;
            this.element = document.getElementById("chatPanel");
            this.element.appendChild(outerdiv);

            var innerdiv = document.createElement("div");
            innerdiv.classList.add("col-md-3", "offset-md-9");
            innerdiv.id = innerdivId;
            this.element = document.getElementById(outerdivId);
            this.element.appendChild(innerdiv);

            var maindiv = document.createElement("div");
            maindiv.classList.add("chat-bubble", "chat-bubble--right");
            maindiv.id = mainDivId;
            maindiv.innerHTML = `<p>${res.data[i].chat}</p>
            <span class="time">${res.data[i].chatsDate}</span>`;
            this.element = document.getElementById(innerdivId);
            this.element.appendChild(maindiv);
          }

          if (res.data[i].senderUserName == 'Admin') {
            const innerdivId = `innerSenderDiv${i}`;
            const outerdivId = `outerSenderDiv${i}`;
            const mainDivId = `mainSenderDiv${i}`;
            var outerdiv = document.createElement("div");
            outerdiv.classList.add("row", "no-gutters");
            outerdiv.id = outerdivId;
            this.element = document.getElementById("chatPanel");
            this.element.appendChild(outerdiv);

            var innerdiv = document.createElement("div");
            innerdiv.classList.add("col-md-3");
            innerdiv.id = innerdivId;
            this.element = document.getElementById(outerdivId);
            this.element.appendChild(innerdiv);

            var maindiv = document.createElement("div");
            maindiv.classList.add("chat-bubble", "chat-bubble--left");
            maindiv.id = mainDivId;
            maindiv.innerHTML = `<p>${res.data[i].chat}</p>
            <span class="time">${res.data[i].chatsDate}</span>`;
            this.element = document.getElementById(innerdivId);
            this.element.appendChild(maindiv);
          }
        }
      })
  }

  isDifferentDay(chatIndex: number): any {
    if (chatIndex === 0) return true;

    const d1 = new Date(this.allMsgs[chatIndex - 1].date);
    const d2 = new Date(this.allMsgs[chatIndex].date);
    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }

  getMessageDate(chatIndex: number): any {
    let dateToday = new Date().toDateString();
    let longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    let dateYesterday = longDateYesterday.toDateString();
    let today = dateToday.slice(0, dateToday.length - 5);
    let yesterday = dateYesterday.slice(0, dateToday.length - 5)

    const wholeDate = new Date(
      this.allMsgs[chatIndex].date
    ).toDateString();

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);

    if (
      new Date(this.allMsgs[chatIndex].date).getFullYear() ===
      new Date().getFullYear()
    ) {
      if (this.messageDateString === today) {
        return "Today";
      } else if (this.messageDateString === yesterday) {
        return "Yesterday";
      } else {
        return this.messageDateString;
      }
    } else {
      return wholeDate;
    }
  }

  closeModal() {
    this.modalDialog.close()
  }

}
