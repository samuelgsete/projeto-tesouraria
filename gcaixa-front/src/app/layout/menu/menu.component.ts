import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/shared/modelos/Usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private usuario = new Usuario({ nome: 'Samuel'});

  constructor(private servico: UsuarioService, private router: Router) { }

  public logout() {
    this.servico.logout();
  }

  ngOnInit() { }

}
