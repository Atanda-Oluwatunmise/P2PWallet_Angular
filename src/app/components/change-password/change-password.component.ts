import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class ChangePasswordComponent {
  public resQuestion: any = {};
  public saveInProgress: any;

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() {
    this.api.getSecurityDetail()
      .subscribe((res) => {
        console.log(res);
        this.resQuestion = res.data;
        console.log(this.resQuestion)
      })
  }

  submitInfo(passwordInfo:{currentPassword: any, answer: any, newPassword: any, confirmPassword: any}){
    this.saveInProgress = document.getElementById("overlay");
    this.saveInProgress.style.display = "block";
    console.log(passwordInfo);
    this.api.chagePassword(passwordInfo)
    .subscribe((res:any) =>{
      console.log(res);
      this.saveInProgress.style.display = "none";
      if(res.status != true){
        Swal.fire({
          title: 'Error!',
          text: res.statusMessage,
          confirmButtonColor: '#53277E',
          icon: 'error',
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }else if(res.status == true){
        Swal.fire({
          title: 'Success!',
          text: res.data,
          confirmButtonColor: '#53277E',
          icon: 'success'
        }).then((result) => {
          if(result.isConfirmed){
            this.router.navigate(['dashboard']);
          }
        })
      }else {
        Swal.fire({
          title: 'Error!',
          text: "Password validations were not met",
          confirmButtonColor: '#53277E',
          icon: 'error',
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        })  
      } 
    })
  }
}
