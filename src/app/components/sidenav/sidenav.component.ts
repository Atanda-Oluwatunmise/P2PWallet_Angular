import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class SidenavComponent {
  [x: string]: any;

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router){}
  
 logout(){
  this.auth.logout();
 }
}
