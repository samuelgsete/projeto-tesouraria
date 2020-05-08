import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  public relatorio = new Relatorio();

  public indicadorDeCarregamento = true;

  public meses = [
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

  public anos = [ 2020, 2021, 2022 ];

  public mesSelecionado = 'Janeiro';
  public anoSelecionado = 2020;

  constructor(
          private service: TesourariaService,
          private router: Router,
          private toastr: ToastrService
  ) 
  
  { 
    this.obterRelatorio();
  }

  public obterRelatorio() {
    let id = parseInt(this.router.url.split('/')[2]);
    let mes = this.meses.indexOf(this.mesSelecionado) + 1;

    this.service.obterRelatorioMensal(id, this.anoSelecionado, mes).subscribe( response => {
      this.relatorio = response.body
      this.indicadorDeCarregamento = false;
      console.log(this.relatorio);
    }, error => {
      
    })
  }

  ngOnInit() { }
}

export class Relatorio {

  public saldoInicial = 0;
  public saldoAtual = 0;
  public saldoReal = 0;
  public rendimentoTotalEntradas = 0;
  public rendimentoTotalSaidas = 0;
  public entradas = [];
  public saidas = [];
  public rendimentoMensalEntradas = 0;
  public rendimentoMensalSaidas = 0;
  public saldoMensal = 0;

}