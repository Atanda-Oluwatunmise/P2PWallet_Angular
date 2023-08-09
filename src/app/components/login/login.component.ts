import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    // "node_modules/ngx-toastr/toastr.css",
    './login.component.css',
  ]
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

   //inject important things, inject auth service, inject router
   constructor(private fb: FormBuilder, private loader: LoaderService,private auth:AuthService, private router: Router, private toastr: ToastrService){}

   //grouping form, use form-group
   loginForm!: FormGroup;

   ngOnInit(): void{
    //initialize your form
    this.loginForm= this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required]
    })
   }
  
   hideShowPassword(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if(this.loginForm.valid){
      //send object to the database
      //this.loader.setLoading(true);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>{
          // console.log(res)
          alert(res.statusMessage)
          this.loginForm.reset()
          this.auth.storeToken(res.data.token)
          this.auth.storeRefreshToken(res.data.refreshToken)
          // this.toastr.success('Successful', 'User logged in successfully')
          //this.loader.getLoading();
          this.router.navigate(['dashboard']);  
        },
        error: (err)=> {
          alert(err?.error.statusMessage)
        }
      })
    }else{
      //throw an error using toaster with required fields
      console.log("form is not valid");
      validateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid")
    }
  }

}
