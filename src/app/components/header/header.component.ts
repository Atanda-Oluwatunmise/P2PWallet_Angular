import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class HeaderComponent {
  [x: string]: any;

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router){}
  
 logout(){
  this.auth.logout();
 }

}
