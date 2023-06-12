import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token.api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    //if you have your token, modify request
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `bearer ${myToken}`}
      })
    }

    return next.handle(request).pipe(
      catchError((err: any): Observable<any>  => {
        if(err instanceof HttpErrorResponse ){
          if(err.status === 401){
            return this.handleUnAuthorizedError(request, next)
          }
        }
        return throwError(() => new Error("Some other error occured"));
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler ){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data: any) => {
        let refreshTokenApi = data as TokenApiModel;
        this.auth.storeRefreshToken(refreshTokenApi.refreshToken);
        this.auth.storeToken(refreshTokenApi.accessToken);
        req = req.clone({
          setHeaders: {Authorizations: `Bearer ${refreshTokenApi.accessToken}`}
        })
        return next.handle(req)
      }),
      catchError((err)=>{
        return throwError(() =>{
          alert("Token is expired, Please Login again");
          this.router.navigate(['login'])
        })
      })
    )
  }
}

