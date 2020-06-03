import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { ToastrService } from 'ngx-toastr';
import { Receitas } from 'src/app/shared/models/Receitas';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  public historico = {};
  public receitas = new Receitas();
  public indicadorDeCarregamento = true;
  public anos = [ 2019, 2020, 2021, 2022 ];
  public anoSelecionado = new Date().getFullYear();

  public chartType: string = 'bar';
 
  public rendimentos = [
    { data: [], label: 'RECEITAS' },
    { data: [], label: 'DESPESAS' }
  ];

  public faturamento = [
    { data: [], label: 'FATURAMENTO ACUMULADO' },
    { data: [], label: 'FATURAMENTO MENSAL' }
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

  public faturamentoCor = [
    {
      backgroundColor: '#2BBBAD',
    },
    {
      backgroundColor: '#ffbb33',
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: 
    { 
      xAxes: [{}], 
      yAxes: [{ 
        ticks: {
          callback: function(value) {
              return `R$ ${value}`;
          }
      }
    }] 
  },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
        }
      }
    }
  };

  public constructor(
          private router: Router, 
          private servico: TesourariaService, 
          private toastr: ToastrService
  ) { 
    this.obterReceitas();
    this.alimentarGrafico();
  }

  public alimentarGrafico() {
    let id = this.router.url.split('/')[2];

    this.chartLabels = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    this.indicadorDeCarregamento = true;
    this.servico.obterHistoricoMensal(id, this.anoSelecionado).subscribe( response => {
      this.historico = response.body;
      this.plotar(this.historico);
      this.indicadorDeCarregamento = false;

    }, error => {
      this.errorMessage(error);
    });
  }

  private plotar(body: any) {
    this.rendimentos = [
      { data: [], label: 'RECEITAS' },
      { data: [], label: 'DESPESAS' }
    ];

    this.faturamento = [
      { data: [], label: 'FATURAMENTO ACUMULADO' },
      { data: [], label: 'FATURAMENTO MENSAL' }
    ];

    const incomes = body.incomeYearly;
  
    incomes.forEach(income => {
      this.rendimentos[0].data.push(income.incomeRecipes);
      this.rendimentos[1].data.push(income.incomeExpenses);
    });

    const history = body.historyYearly;

    history.forEach( item => {
      this.faturamento[0].data.push(item.cumulativeBilling);
      this.faturamento[1].data.push(item.monthlyBiiling);
    });
  }

  public obterReceitas() {
    let id = this.router.url.split('/')[2];
    this.servico.getRecipes(id).subscribe( response => {
      this.receitas = response;
    },
    erro => {
      this.errorMessage(erro);
    });
  }

  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.error('Necessário autenticação', 'ERRO', { progressBar: true });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }
    else {
      this.toastr.error(err.error.detalhes, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }
                  
  ngOnInit() {}
}
