import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }

  canActivate(): boolean{
      if(this.auth.isLoggedIn()){
        return true;
      }else{
        this.router.navigate(['/login'])
        return false;
      }
  } 

  //creating a condition to which the guard will return a value
  //-if token is present, allow : do not allow
}