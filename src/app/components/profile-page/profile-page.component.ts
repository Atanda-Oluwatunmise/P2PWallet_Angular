import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class ProfilePageComponent {
  public details: any = [];
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

  constructor(public api: ApiService, public router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {

    this.api.verifyImageStatus()
      .subscribe((res) => {
        if (res === true) {
          this.element = document.getElementById("fileUploadbtn");
          this.element.style.display = "none";
        } else {
          this.element.style.display = "block";
        }
      })

    this.api.displayImage()
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.imagePath != null) {
            var resp = "data:image/png;charset=utf-8;base64," + res.imagePath;
            this.url = resp;
            this.element = document.getElementById("deletePic");
            this.element.style.display = "block";
          }
        }
      })

    this.getDetails = this.api.getuserDetails()
      .subscribe((res) => {
        console.log(res.data);
        this.details = res.data;
        console.log(this.details);
      })
  }

  url = "/assets/user.png"

  showPreview(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      this.addnewImage(e.target.files[0])
    }
  }

  addnewImage(event: any) {
    console.log("image path:" + event);
    this.fileToUpload = event;
    const formData: FormData = new FormData();
    formData.append('imagePath', this.fileToUpload);
    console.log(formData);
    this.api.uploadImage(formData)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == true) {
          window.location.reload();
        }
      })
  }

  deleteProfilePicture() {
    Swal.fire({
      title: 'Delete Image?',
      text: 'Your Image will be deleted permanently!',
      confirmButtonColor: '#53277E',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteImage()
          .subscribe((res: any) => {
            console.log(res);
            if (res.status == true) {
              Swal.fire({
                title: 'Success!',
                text: 'Image deleted!',
                confirmButtonColor: '#53277E',
                icon: 'success',
              })
              this.element = document.getElementById("deletePic");
              this.element.style.display = "none";
              window.location.reload();
            }
          })
      }
    })
  }

  editUserInfo() {
    //   const formData: FormData = new FormData();
    //   formData.append('imageFile', this.fileToEdit);
    //   const fName = this.fileForm.get("firstName")?.value;
    //   console.log(fName);
    //   // formData.append('firstName', fName);
    //   // formData.append('lastName', this.fileToUpload);
    //   // formData.append('address', this.fileToUpload);
    //   // formData.append('phonenumber', this.fileToUpload);
  }
}
