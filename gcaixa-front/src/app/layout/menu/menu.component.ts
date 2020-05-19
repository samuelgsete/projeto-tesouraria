import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private usuario: string = '';

  public constructor(private servico: UsuarioService, private router: Router) { 
    this.usuario = localStorage.getItem("name_user");
  }

  public logout() {
    this.servico.logout();
  }

  ngOnInit() { }
}
