import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { Income } from 'src/app/shared/models/income.entity';
import { Report } from 'src/app/shared/models/report.entity';
import { ReportService } from 'src/app/shared/services/report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  public report = new Report();
  public annualReport: Report[] = [];
  public income = new Income();
  public loading = true;
  public subscriptions: Subscription[] = [];

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
    'Outubro', 
    'Novembro',
    'Dezembro',
    "Todos os meses"
  ];

  public years = [ 2020, 2021, 2022 ];
  public monthSelected = 'Janeiro';
  public yearSelected = 2020;

  public chartType: string = 'bar';

  public recipes = [
    { data: [], label: 'RECEITAS' }
  ];

  public expenses = [
    { data: [], label: 'DESPESAS' }
  ]

  public labelsRecipes = [];
  public labelsExpenses = [];

  public colorsRecipes = [
    {
      backgroundColor: 'rgb(51, 181, 229, .9)'
    }
  ];

  public colorsExpenses = [
    {
      backgroundColor: 'rgb(255, 68, 68, .9)'
    }
  ]

  public chartOptions: any = {
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
              return `R$ ${value}`;
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
                        private service: ReportService,
                        private router: Router,
                        private toastr: ToastrService
                    ) 
  { 
    this.getReport();
  }
 
  public getReport() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.months.indexOf(this.monthSelected);
    this.loading = true;
    this.subscriptions.push(this.service.getReport(id, this.yearSelected, month).subscribe( response => { 
      if(!Array.isArray(response.body)) {
        this.report = response.body;
        this.annualReport = [];
      }
      else {
        this.annualReport = response.body;
        this.report = new Report();
      }
      this.feedChart();
    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    }));
  }

  private feedChart() {
    this.recipes = [
      { data: [], label: 'RECEITAS' }
      
    ];

    this.expenses = [
      { data: [], label: 'DESPESAS' }
    ]

    this.labelsRecipes = [];
    this.labelsExpenses = [];

    this.report.recipes.forEach( recipe => {
      this.recipes[0].data.push(recipe.value);
      this.labelsRecipes.push(moment(recipe.registeredIn).format('DD/MM/YYYY'));
    });

    this.report.expenses.forEach( expense => {
      this.expenses[0].data.push(expense.value);
      this.labelsExpenses.push(moment(expense.registeredIn).format('DD/MM/YYYY'));
    });

    this.expenses[0].data.push(0);
    this.labelsExpenses.push('');

    this.recipes[0].data.push(0);
    this.labelsRecipes.push('');
  }

  public download() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.months.indexOf(this.monthSelected);
    this.loading = true;
    this.subscriptions.push(this.service.downloadReport(id, this.yearSelected, month).subscribe( res => {
      const newWin = open();
      newWin.document.write(res.body);
    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    }));
  }
  
  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }
    
    else if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.error('Necessário autenticação', 'Sessão expirada', { progressBar: true });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => {
      sub.unsubscribe();
    });
  }
}