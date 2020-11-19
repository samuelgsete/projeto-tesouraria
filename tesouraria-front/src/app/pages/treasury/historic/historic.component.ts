import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { HistoricService } from 'src/app/shared/services/historic.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  public historic = {};
  public loading = true;
  public years = [ 2019, 2020, 2021, 2022 ];
  public yearSelected = new Date().getFullYear();

  public chartType: string = 'bar';
 
  public transactions = [
    { data: [], label: 'RECEITAS' },
    { data: [], label: 'DESPESAS' }
  ];

  public billing = [
    { data: [], label: 'FATURAMENTO ACUMULADO' },
    { data: [], label: 'FATURAMENTO MENSAL' }
  ];

  public chartLabels = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  public transactionsColors = [
    {
      backgroundColor: '#33b5e5'
    },
    {
      backgroundColor: '#ff4444'
    }
  ];

  public billingColors = [
    {
      backgroundColor: '#2BBBAD'
    },
    {
      backgroundColor: '#ffbb33'
    }
  ];

  public inventoriesColors = [
    {
      backgroundColor: '#4285F4'
    },
    {
      backgroundColor: '#3F729B'
    },
    {
      backgroundColor: '#0091ea'
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
        display: false,
      }
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return `R$ ${tooltipItem.value}`;
        }
      }
    }
  };

  public chartOptionsMobile: any = {
    responsive: true,
    scales: 
    { 
      xAxes: [{
        ticks: {
          callback: function(value) {
              return ``;
          }
        }
      }], 
      yAxes: [{ 
        ticks: {
          callback: function(value) {
              return ``;
          }
        }
      }] 
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return `R$ ${tooltipItem.value}`;
        }
      }
    },
    plugins: {
      datalabels: {
          display: false,
      }
    }
  };

  public constructor(
                        private readonly router: Router, 
                        private readonly historicService: HistoricService, 
                        private readonly toastr: ToastrService
                    ) 
  { 
    this.feedChart();
  }

  public feedChart() {
    let id = parseInt(this.router.url.split('/')[2]);

    this.chartLabels = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    this.loading = true;
    this.historicService.getHistoric(id, this.yearSelected).subscribe( response => {
      this.historic = response.body;
      this.populate(this.historic);

    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  private populate(body: any) {
    this.transactions = [
      { data: [], label: 'SOMATÓRIO DE RECEITAS' },
      { data: [], label: 'SOMÁTORIO DE DESPESAS' }
    ];

    this.billing = [
      { data: [], label: 'FATURAMENTO ACUMULADO' },
      { data: [], label: 'FATURAMENTO MENSAL' }
    ];

    const incomes = body.incomeYearly;
  
    incomes.forEach(income => {
      this.transactions [0].data.push(income.incomeRecipes);
      this.transactions [1].data.push(income.incomeExpenses);
    });

    const history = body.historyYearly;

    history.forEach( item => {
      this.billing[0].data.push(item.cumulativeBilling);
      this.billing[1].data.push(item.monthlyBiiling);
    });

  }

  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('user/auth');
      this.toastr.error('Necessário autenticação', 'Sessão expirada', { progressBar: true, positionClass: 'toast-bottom-center' });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
    }
  }
                  
  ngOnInit() {}
}