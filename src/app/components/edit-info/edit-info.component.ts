import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class EditInfoComponent implements OnInit {

  //public details: any = [];
  public element: any;
  public infoElement: any
  public getDetails: any;
  public firstName: any;
  public lastName: any;
  public address: any;
  public phonenumber: any;
  public fileToUpload: any;
  public fileToEdit: any;

  fileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    phonenumber: new FormControl('')
  });

  @Input() dataa: any = [];
  // details : any = [];

  constructor(public api: ApiService, public router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.dataa);
    this.api.displayImage()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.imagePath != null) {
            var resp = "data:image/png;charset=utf-8;base64," + res.imagePath;
            this.url = resp;
          }
        }
      })

  }

  url = "/assets/user.png"

  handleFileInput(e: any) {
    this.fileToEdit = e?.target?.files[0];
    console.log(this.fileToEdit);
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  saveUserInfo(e:any) {
 
    const formData: FormData = new FormData();
    console.log(`fileToEdit: ${this.fileToEdit}`);
    formData.append('imageFile', this.fileToEdit);
    console.log(`formData: ${formData}`);
    const fName = this.fileForm.get("firstName")?.value;
    console.log(fName);
    //  formData.append('firstName', fName);
    //   // formData.append('lastName', this.fileToUpload);
    //   // formData.append('address', this.fileToUpload);
    //   // formData.append('phonenumber', this.fileToUpload);
  }

}



