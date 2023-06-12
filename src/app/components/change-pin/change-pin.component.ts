import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class ChangePinComponent {
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

  submitInfo(pinInfo:{currentPin: any, answer: any, newPin: any, confirmPin: any}){
    this.saveInProgress = document.getElementById("overlay");
    this.saveInProgress.style.display = "block";
    console.log(pinInfo);
    this.api.changePin(pinInfo)
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
      }else{
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
      } 
    })
  }
}
