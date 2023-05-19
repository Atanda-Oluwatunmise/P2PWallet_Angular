import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TranfersComponent } from '../tranfers/tranfers.component';
import { FundAccountComponent } from '../fund-account/fund-account.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes = [
    {path: "dashboard", component: DashboardComponent},
    {path: "transfers", component: TranfersComponent, canActivate: [AuthGuard]},
    {path: "fundaccount", component: FundAccountComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    // DashboardComponent,
    //TranfersComponent,
    //FundAccountComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class DashboardModule { }
