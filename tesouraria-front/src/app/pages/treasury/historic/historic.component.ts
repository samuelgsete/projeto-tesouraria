import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { Income } from 'src/app/shared/models/income.entity';
import { IncomeService } from '../income/income.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  public historic = {};
  public income = new Income();
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

  public constructor(
                      private router: Router, 
                      private servico: TreasuryService, 
                      private toastr: ToastrService,
                      private incomeService: IncomeService
  ) { 
    this.getIncome();
    this.feedChart();
  }

  public feedChart() {
    let id = parseInt(this.router.url.split('/')[2]);

    this.chartLabels = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    this.loading = true;
    this.servico.getHistoric(id, this.yearSelected).subscribe( response => {
      this.historic = response.body;
      this.populate(this.historic);
      this.loading = false;

    }, error => {
      this.errorMessage(error);
    });
  }

  private populate(body: any) {
    this.transactions = [
      { data: [], label: 'RECEITAS' },
      { data: [], label: 'DESPESAS' }
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

  public getIncome() {
    let id = parseInt(this.router.url.split('/')[2]);
    this.servico.getIncome(id).subscribe( response => {
      this.income = response;
      this.incomeService.loader(this.income.initialAmount, this.income.currentBalance, this.income.incomeRecipes, this.income.incomeExpenses);
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
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }
                  
  ngOnInit() {}
}