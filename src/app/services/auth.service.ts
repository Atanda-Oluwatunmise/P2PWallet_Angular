import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userbaseUrl:string = "http://localhost:5127/api/User/"

  //inject the httpclient
  constructor(private http: HttpClient, private router: Router) { }

  signup(userObj: any){
    return this.http.post<any>(`${this.userbaseUrl}register`, userObj)
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.userbaseUrl}login`, loginObj)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(token: string){
    localStorage.setItem('bearer', token);
  }

  getToken(){
    return localStorage.getItem('bearer');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('bearer');  //!! converts string to boolean value
  }
}
