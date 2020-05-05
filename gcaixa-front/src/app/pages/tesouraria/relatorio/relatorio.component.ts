import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Relatorio } from 'src/app/shared/modelos/Relatorio';
import { ToastrService } from 'ngx-toastr';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { Tesouraria } from 'src/app/shared/modelos/Tesouraria';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  public tesouraria = new Tesouraria();
  public resumo = new Resumo();

  public indicadorDeCarregamento = true;

  public months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril', 
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outrubo', 
    'Novembro',
    'Dezembro'
  ];

  public years = [
    2018, 
    2019, 
    2020, 
    2021, 
    2022
  ];

  public monthSelected = 'Janeiro';
  public yearSelected = 2020;

  constructor(
          private service: TesourariaService,
          private router: Router,
          private toastr: ToastrService
  ) 
  
  { 
    this.gerarRelatorio();
  }

  public gerarRelatorio() {
    let id = this.router.url.split('/')[2];

    let month = this.months.indexOf(this.monthSelected) + 1;

    this.service.findById(id).subscribe( response => {

      this.indicadorDeCarregamento = false;
      this.tesouraria = response;

      this.tesouraria = new Tesouraria({
        id: response.id,
        nome: response.nome,
        saldoInicial: response.saldoInicial,
        saldoAtual: response.saldoAtual,
        entradas: response.entradas,
        saidas: response.saidas,
        contagens: response.contagens,
        detalhes: response.detalhes
      });

      this.resumo = this.tesouraria.gerarRelatorioPorPeriodo(this.yearSelected, month);
      
    }, error => {

      if(error.status == 401) {
        this.router.navigateByUrl('/login');
        this.toastr.info('Necessário autenticação', 'Sessão expirada', { progressBar: true });
        localStorage.removeItem('id_token');
      }

      else {
        this.toastr.error(error.error.detalhes, 'ERRO', { progressBar: true });
      }
    });
  }

  ngOnInit() { }
}

export class Resumo {
  entradas = []
  saidas = []
  rendimentoMensalEntradas: number
  rendimentoMensalSaidas: number
  saldoMensal: number
  rendimentoEntradas: number;
  rendimentoSaidas: number
}
