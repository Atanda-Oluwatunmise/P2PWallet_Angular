import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { SignalrService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class HeaderComponent {
  public users : any = [];
  public element: any;
  public notificationCount: number = 0;
  constructor(private signalr: SignalrService, private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(){
    this.signalr.startConnection(); 
    this.api.getuserDetails()
    .subscribe((res:any)=> {
      console.log(res);
      this.users = res.data;
      console.log(this.users[0].username);
    })
    this.signalr.receiveAlert((user, message)=>{
      if (this.users[0].username == user){
        this.notificationCount ++;
       console.log(user);
       //alert(message);
     }
       return;
   })
    // this.notificationCount+= 1;
  }

  showMessage(message: string){
    //create a dropdownbox
  }

  showdropDOwn(){
    document.getElementById("myDropdown")?.classList.add("show");
  }
 logout(){
  this.auth.logout();
 }

}
