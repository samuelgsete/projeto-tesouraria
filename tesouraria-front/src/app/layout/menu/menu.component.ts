import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public usuario: string = '';

  public constructor(private service: AuthService, private router: Router) { 
    this.usuario = localStorage.getItem("name_user");
  }

  public logoutUser() {
    this.service.logoutUser();
  }

  public account() {
    this.router.navigateByUrl('/account');
  }

  ngOnInit() { }
}
