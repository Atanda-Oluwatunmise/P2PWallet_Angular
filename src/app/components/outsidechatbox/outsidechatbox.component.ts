import { Component } from '@angular/core';
import { ContactAdminComponent } from '../contact-admin/contact-admin.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-outsidechatbox',
  templateUrl: './outsidechatbox.component.html',
  styleUrls: ['./outsidechatbox.component.css']
})
export class OutsidechatboxComponent {
public message: any;

  constructor(public modalDialog: MatDialogRef<ContactAdminComponent>){}

  closeModal() {
    this.modalDialog.close()
  }

}
