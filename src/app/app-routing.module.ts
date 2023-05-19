import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranfersComponent } from './components/tranfers/tranfers.component';
import { AuthGuard } from './guards/auth.guard';
import { FundAccountComponent } from './components/fund-account/fund-account.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';

//configure the routing in the app module
const routes: Routes = [
  //configuring routing ,if path? load component
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "tranfers", component: TranfersComponent, canActivate: [AuthGuard]},
  {path: "fundaccount", component: FundAccountComponent, canActivate: [AuthGuard]},
  {path: "modalpopup", component: ModalPopupComponent, canActivate: [AuthGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //configures the root routing of the app,
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
            LoginComponent,
            SignupComponent,
            DashboardComponent,
            TranfersComponent,
            FundAccountComponent
]