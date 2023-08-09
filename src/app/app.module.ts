import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './search.pipe';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { TranfersComponent } from './components/tranfers/tranfers.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FundAccountComponent } from './components/fund-account/fund-account.component';
import { DatePipe } from '@angular/common';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PaystackComponentComponent } from './components/paystack-component/paystack-component.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ChangePinComponent } from './components/change-pin/change-pin.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { AllTransactionsComponent } from './components/all-transactions/all-transactions.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TransactionstatementComponent } from './components/transactionstatement/transactionstatement.component';
import { GeneratestatementComponent } from './components/generatestatement/generatestatement.component';
import { CreatewalletComponent } from './components/createwallet/createwallet.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DownloadstatementComponent } from './components/downloadstatement/downloadstatement.component';
import { NewtransferComponent } from './components/newtransfer/newtransfer.component';
import { NotificationcomponentComponent } from './components/notificationcomponent/notificationcomponent.component';
import { KycverificationComponent } from './components/kycverification/kycverification.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  //{path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tranfers', component: TranfersComponent},
  {path: 'fundaccount', component: FundAccountComponent}
]

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SearchPipe,
    HeaderComponent,
    TranfersComponent,
    FundAccountComponent,
    ModalPopupComponent,
    PaystackComponentComponent,
    ProfilePageComponent,
    ChangePinComponent,
    ChangePasswordComponent,
    EditInfoComponent,
    AllTransactionsComponent,
    SpinnerComponent,
    TransactionstatementComponent,
    GeneratestatementComponent,
    CreatewalletComponent,
    SidenavComponent,
    DownloadstatementComponent,
    NewtransferComponent,
    NotificationcomponentComponent,
    KycverificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FormsModule,
    NoopAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatSidenavModule
  ],
  // exports: [
  //   MatDialogModule
  // ],
  providers: [
    DatePipe,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
