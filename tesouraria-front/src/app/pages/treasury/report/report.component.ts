import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { Income } from 'src/app/shared/models/income.entity';
import { Report } from 'src/app/shared/models/report.entity';
import { IncomeService } from '../income/income.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public report = new Report();
  public income = new Income();
  public loading = true;

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
      backgroundColor: '#33b5e5'
    }
  ];

  public colorsExpenses = [
    {
      backgroundColor: '#ff4444'
    }
  ]

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
    }
  };

  public constructor(
          private service: TreasuryService,
          private router: Router,
          private toastr: ToastrService,
          private readonly incomeService: IncomeService
  ) 
  { 
    this.getIncome(); 
    this.getReport();
  }

  public getReport() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.months.indexOf(this.monthSelected);
    this.loading = true;
    this.service.getReport(id, this.yearSelected, month).subscribe( response => {
      this.report = response.body
      this.loading = false;
      this.feedChart();
    }, error => {
      this.errorMessage(error);
    });
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

  public getIncome() {
    let id = parseInt(this.router.url.split('/')[2]);
    this.service.getIncome(id).subscribe( response => {
      this.income = response;
      this.incomeService.loader(this.income.initialAmount, this.income.currentBalance, this.income.incomeRecipes, this.income.incomeExpenses);
    },
    erro => {
      this.errorMessage(erro);
    });
  }

  public download() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.months.indexOf(this.monthSelected);
    this.service.downloadReport(id, this.yearSelected, month).subscribe( res => {
      const newWin = open();
      newWin.document.write(res.body);
      
    });
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
}