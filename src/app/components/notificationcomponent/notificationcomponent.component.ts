import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificationcomponent',
  templateUrl: './notificationcomponent.component.html',
  styleUrls: ['./notificationcomponent.component.css']
})
export class NotificationcomponentComponent {
  public referenceNo: any;
  public referenceObject: any = {
    "reference": ""
  }
  public data: any;
  public element: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<HeaderComponent>, public api: ApiService, public router: Router) {
    this.referenceNo = data;
  }
  ngOnInit(){
    console.log(this.referenceNo);
    this.referenceObject["reference"] = this.referenceNo;
    this.api.getNotificationDetail(this.referenceObject)
    .subscribe((res:any) => {
      if(res.status == true){
        this.data = res.data;
        // this.element = document.getElementById('myDropdown');
        // this.element.querySelector('a').removeChild();
      }
    })
  }

  closeModal() {
    this.modalDialog.close();
    window.location.reload();
  }
}
