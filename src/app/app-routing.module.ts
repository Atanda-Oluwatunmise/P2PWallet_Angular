import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranfersComponent } from './components/tranfers/tranfers.component';
import { AuthGuard } from './guards/auth.guard';
import { FundAccountComponent } from './components/fund-account/fund-account.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ChangePinComponent } from './components/change-pin/change-pin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { AllTransactionsComponent } from './components/all-transactions/all-transactions.component';
import { TransactionstatementComponent } from './components/transactionstatement/transactionstatement.component';
import { GeneratestatementComponent } from './components/generatestatement/generatestatement.component';
import { CreatewalletComponent } from './components/createwallet/createwallet.component';

//configure the routing in the app module
const routes: Routes = [
  //configuring routing ,if path? load component
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "tranfers", component: TranfersComponent, canActivate: [AuthGuard] },
  { path: "fundaccount", component: FundAccountComponent, canActivate: [AuthGuard] },
  { path: "modalpopup", component: ModalPopupComponent, canActivate: [AuthGuard] },
  // {path: "profilepage", component:ProfilePageComponent, canActivate: [AuthGuard]},
  {
    path: "profilepage",
    children: [
      { path: "", component: ProfilePageComponent, canActivate: [AuthGuard] },
      { path: "editinfo", component: EditInfoComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: "changepin", component: ChangePinComponent, canActivate: [AuthGuard] },
  { path: "changepassword", component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: "alltransactions", component: AllTransactionsComponent, canActivate: [AuthGuard] },
  { path: "transactionsstatement", component: TransactionstatementComponent, canActivate: [AuthGuard] },
  { path: "generatestatement", component: GeneratestatementComponent, canActivate: [AuthGuard] },
  { path: "createwallet", component: CreatewalletComponent, canActivate: [AuthGuard] },
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
  FundAccountComponent,
  ProfilePageComponent,
  ChangePinComponent,
  ChangePasswordComponent,
  EditInfoComponent,
  AllTransactionsComponent,
  TransactionstatementComponent,
  GeneratestatementComponent,
  CreatewalletComponent
]