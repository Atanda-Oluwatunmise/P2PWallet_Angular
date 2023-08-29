import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SignalrService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-userchats',
  templateUrl: './userchats.component.html',
  styleUrls: ['./userchats.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class UserchatsComponent {
  public message: any;
  public founduserName: any;
  public chatuserName: any;
  public users: any;
  public username: any;
  public userMsg: any;
  public element: any;
  public searchUser: any;
  public elementOne: any;
  public elementTwo: any;
  public elementThree: any;
  public messageObj: any = {
    username: "",
    message: ""
  }
  public startChatObj: any = {
    senderUserName: "",
    receiverUserName: ""
  }
  public getstartedChatsObj: any = {
    senderUserName: "",
    receiverUserName: ""
  }

  public findUserDto: any = {
    userSearch: ""
  }
  public oldMesssagesObj: any = {
    senderUserName: "tom",
    receiverUserName: "Admin"
  }
  public allMsgs: any;
  public messageDateString: any;
  public resp: any;
  public outerdiv: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<HeaderComponent>, public api: ApiService, public signalr: SignalrService) { }

  ngOnInit() {
    this.signalr.startConnection();
    this.api.getuserDetails()
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.data;
        this.username = this.users[0].username;
      })
    this.getListofStartedChats();
    //this.getAdminChats();

    this.signalr.receiveMessage((user, msg, time) => {
      const uniqueNumber = new Date().getTime()
      const innerdivId = `innerReceiverDiv${uniqueNumber}`;
      const outerdivId = `outerReceiverDiv${uniqueNumber}`;
      const mainDivId = `mainReceiverDiv${uniqueNumber}`;
      if (this.username != user) {
        this.outerdiv = document.createElement("div");
        this.outerdiv.classList.add("row", "no-gutters");
        this.outerdiv.id = outerdivId;
        this.elementOne = document.getElementById("chatPanel");
        this.elementOne.appendChild(this.outerdiv);

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

  getMessagesofChat(){
    this.outerdiv.addEventListener('click', () => {
    this.startConversation(this.startChatObj);
    })
  }

  getAdminChats() {
    this.api.getuserDetails()
      .subscribe((res: any) => {
        this.startChatObj["senderUserName"] = res.data[0].username;
        this.startChatObj["receiverUserName"] = "Admin";
        this.startConversation(this.startChatObj);
      })
  }

  getListofStartedChats() {
    this.api.getuserDetails()
      .subscribe((res: any) => {
        this.getstartedChatsObj["senderUserName"] = res.data[0].username;
        this.getstartedChatsObj["receiverUserName"] = "";
        this.api.StartedChats(this.getstartedChatsObj)
          .subscribe((res: any) => {
            if (res.status == true) {
              for (let i = 0; i < res.data.length; i++) {
                this.founduserName = res.data[i].username;
                this.startChatObj["senderUserName"] = this.username;
                this.startChatObj["receiverUserName"] = this.founduserName;
                console.log(this.founduserName);
                console.log(this.startChatObj);
                var outerdiv = document.createElement("div");
                outerdiv.classList.add("friend-drawer", "friend-drawer--onhover");
                outerdiv.id = `${this.founduserName}Id`
                outerdiv.innerHTML = `<img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg" alt="">`;
                var innerdiv = document.createElement("div");
                innerdiv.classList.add("text");
                innerdiv.innerHTML = `<h6>${this.founduserName}</h6>`;
                this.element = document.getElementById("sideCont");
                this.element.appendChild(outerdiv);
                this.element = document.getElementById(outerdiv.id);
                this.element.appendChild(innerdiv);
                                
              

              }
            }
          })
      })
  }

  sendMessage() {
    this.messageObj["username"] = this.username;
    this.messageObj["message"] = this.message;
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

  findUser() {
    this.findUserDto["userSearch"] = this.searchUser;
    this.api.FindUser(this.findUserDto)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == true) {
          this.founduserName = res.data.username;
          this.startChatObj["senderUserName"] = this.username;
          this.startChatObj["receiverUserName"] = this.founduserName;
          var outerdiv = document.createElement("div");
          outerdiv.classList.add("friend-drawer", "friend-drawer--onhover");
          outerdiv.addEventListener('click', () => {
            this.startConversation(this.startChatObj);
          })
          outerdiv.id = `${res.data.username}Id`
          outerdiv.innerHTML = `<img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/optimus-prime.jpeg" alt="">`;
          var innerdiv = document.createElement("div");
          innerdiv.classList.add("text");
          innerdiv.innerHTML = `<h6>${res.data.username}</h6>`;
          this.element = document.getElementById("sideCont");
          this.element.appendChild(outerdiv);
          this.element = document.getElementById(outerdiv.id);
          this.element.appendChild(innerdiv);
        }
      })
  }

  startConversation(messageObj: any) {
    console.log(messageObj);
    this.api.StartChatting(messageObj)
      .subscribe((res: any) => {
        if (res.status == true) {
          this.allMsgs = res.data;
          console.log(res);
          if (res.data.length == 0) {
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
              }
              if (res.data[i].senderUserName == 'tom') {
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

  closeModal() {
    this.modalDialog.close()
  }

}
