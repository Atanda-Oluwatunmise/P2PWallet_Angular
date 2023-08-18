import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { SignalrService } from 'src/app/services/signal-r.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationcomponentComponent } from '../notificationcomponent/notificationcomponent.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public users : any = [];
  public element: any;
  public username: any;
  public notificationCount: number = 0;
  public notificationData =[];
  public dataReference: any;
  public msgBodyObj: any ={
    message: ""
  }

  constructor(private toastr: ToastrService, private signalr: SignalrService, private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router, private matdialog: MatDialog){}
  
  ngOnInit(){
    this.signalr.startConnection(); 
    this.api.getuserDetails()
    .subscribe((res:any)=> {
      console.log(res);
      this.users = res.data;
      this.username = this.users[0].username;
    })
    this.signalr.receiveAlert((user, message, reference)=>{
      if (this.users[0].username == user){
        this.notificationCount ++;
       console.log(user);
       console.log(reference);
       //alert(message);
        var a = document.createElement('a');
        a.target = '_blank';
        a.innerText = message;
        //a.classList.add('dropdown-content a', 'dropdown-content a:hover')
        this.element = document.getElementById('myDropdown');
        this.element.appendChild(a);
        a.addEventListener('click', () => {
            // create a component
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.id = "notificationcomponent";
            dialogConfig.height = "480px";
            dialogConfig.width = "690px";
            dialogConfig.data = reference;

            const modalDialog = this.matdialog.open(NotificationcomponentComponent, dialogConfig);
        });
     }
       return;
   })

   this.signalr.kycAlert((user, message,reason) => {
    
    if (this.users[0].username == user) {
      // this.notificationCount ++;
      // var a = document.createElement('a');
      // a.target = '_blank';
      // a.innerText = `${message} has been rejected`;
      // //a.classList.add('dropdown-content a', 'dropdown-content a:hover')
      // this.element = document.getElementById('myDropdown');
      // this.element.appendChild(a);
      // a.addEventListener('click', () => {
      //  window.location.reload();
      // })
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'info',
        title: `${message} document has been rejected`
      })
    }
    window.location.reload();
  })

   this.signalr.lockedUserAlert((user, message)=>{
    if (this.users[0].username == user)
    {
      this.router.navigate(["login"]);
      alert(message);
    }
   })


   this.api.getUnreadNotification()
   .subscribe((res) => {
     if(res.status == true){
       console.log(res.data);
       for(let i=0; i < res.data.length; i++)
       {
         var a = document.createElement('a');
         this.notificationCount ++;
         a.target = '_blank';
         a.innerText = res.data[i].message;
         this.element = document.getElementById('myDropdown');
         this.element.appendChild(a);
         a.addEventListener('click', () => {
           // create a component
           if(res.data[i].reference != ''){
           const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose = true;
           dialogConfig.id = "notificationcomponent";
           dialogConfig.height = "480px";
           dialogConfig.width = "690px";
           dialogConfig.data = res.data[i].reference;

           const modalDialog = this.matdialog.open(NotificationcomponentComponent, dialogConfig);
           }
           else{
            Swal.fire({
              title: 'Notification',
              text: res.data[i].notificationBody,
              confirmButtonColor: '#53277E'
            }).then((result)=>{
              if(result.isConfirmed){
                window.location.reload();
              }
              window.location.reload();
            })
            this.msgBodyObj["message"] = res.data[i].notificationBody;
              this.api.setNotificationToTrue(this.msgBodyObj)
              .subscribe((res)=> {
                console.log(res);
              }) 
           }
       });
       }
     }
   })
  }
  
 logout(){
  this.auth.logout();
 }

}
