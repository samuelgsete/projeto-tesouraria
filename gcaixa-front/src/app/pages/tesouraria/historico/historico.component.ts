import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  public historico = {};
  public anoAtual = new Date().getFullYear();
  public indicadorDeCarregamento = true;

  public chartType: string = 'bar';
 
  public rendimentos = [
    { data: [], label: 'ENTRADAS' },
    { data: [], label: 'SAIDAS' }
  ];

  public saldos = [
    { data: [], label: 'SALDO MENSAL' },
    { data: [], label: 'SALDO REAL' }
  ];

  public chartLabels = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  public rendimentosCores = [
    {
      backgroundColor: '#33b5e5'
    },
    {
      backgroundColor: '#ff4444'
    }
  ];

  public receitasCores = [
    {
      backgroundColor: '#ffbb33',
    },
    {
      backgroundColor: '#0d47a1',
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  public constructor(
          private router: Router, 
          private servico: TesourariaService, 
          private toastr: ToastrService
  ) { 
    this.alimentarGrafico();
  }

  public alimentarGrafico() {
    let id = this.router.url.split('/')[2];

    this.chartLabels = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    this.servico.obterHistoricoMensal(id, this.anoAtual).subscribe( response => {
      this.historico = response.body;
      this.plotar(this.historico);
      this.indicadorDeCarregamento = false;

    }, error => {
      this.errorMessage(error);
    });
  }

  private plotar(body: any) {
    this.rendimentos = [
      { data: [], label: 'ENTRADAS' },
      { data: [], label: 'SAIDAS' }
    ];

    this.saldos = [
      { data: [], label: 'SALDO MENSAL' },
      { data: [], label: 'SALDO REAL' }
    ];

    let rendimentos = body.rendimentosMensais;
  
    rendimentos.forEach(rendimento => {
      this.rendimentos[0].data.push(rendimento.rendimentoEntradas);
      this.rendimentos[1].data.push(rendimento.rendimentoSaidas);
    });

    let receitas = body.receitasMensais;

    receitas.forEach(receita => {
      this.saldos[0].data.push(receita.saldoMensal);
      this.saldos[1].data.push(receita.saldoReal);
    });
  }

  private errorMessage(err: any) {
    if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.error('Necessário autenticação', 'Sessão expirada', { progressBar: true });
      localStorage.removeItem('id_token');
    }
    else {
      this.toastr.error(err.error.detalhes, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }
                  
  ngOnInit() {}
}
