import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import ConfirmedValidator from 'src/app/helpers/confirmed.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})

export class SignupComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
  signupForm!: FormGroup;

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      username:['', Validators.required],
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      phonenumber:['', Validators.required],
      address:['', Validators.required],
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
    },
    { 
      validator:  ConfirmedValidator('password', 'confirmpassword')
    })
  }

  
   hideShowPassword(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if(this.signupForm.valid){
      //send object to the database
      this.auth.signup(this.signupForm.value)
      .subscribe({
        next: (res) => {
          console.log(res)
          alert(res.statusMessage)
          this.signupForm.reset()
          this.router.navigate(['login'])
        },
        error:(err)=>{
          alert(err?.error.statusMessage)
        }
      })
    }else{
      //throw an error using toaster with required fields
      console.log("form is not valid");
      validateForm.validateAllFormFields(this.signupForm);
      alert("your form is invalid")
    }
  }

}
