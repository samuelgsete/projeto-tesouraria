import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { Receitas } from 'src/app/shared/models/Receitas';
import { Relatorio } from 'src/app/shared/models/Relatorio';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public relatorio = new Relatorio();
  public receitas = new Receitas();
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

  public chartType: string = 'bar';

  public entradas = [
    { data: [], label: 'RECEITAS' }
  ];

  public saidas = [
    { data: [], label: 'DESPESAS' }
  ]

  public rotulosEntradas = [];
  public rotulosSaidas = [];

  public coresEntradas = [
    {
      backgroundColor: '#4285F4'
    }
  ];

  public coresSaidas = [
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

  constructor(
          private service: TesourariaService,
          private router: Router,
          private toastr: ToastrService
  ) 
  { 
    this.obterReceitas(); 
    this.obterRelatorio();
  }

  public obterRelatorio() {
    let id = this.router.url.split('/')[2];
    let mes = this.meses.indexOf(this.mesSelecionado);
    this.indicadorDeCarregamento = true;
    this.service.obterRelatorioMensal(id, this.anoSelecionado, mes).subscribe( response => {
      this.relatorio = response.body
      this.indicadorDeCarregamento = false;
      this.alimentarGrafico();
    }, error => {
      this.errorMessage(error);
    });
  }

  private alimentarGrafico() {
    this.entradas = [
      { data: [], label: 'RECEITAS' }
      
    ];

    this.saidas = [
      { data: [], label: 'DESPESAS' }
    ]

    this.rotulosEntradas = [];
    this.rotulosSaidas = [];

    this.relatorio.recipes.forEach( entrada => {
      this.entradas[0].data.push(entrada.valor);
      this.rotulosEntradas.push(moment(entrada.registradoEm).format('DD/MM/YYYY'));
    });

    this.relatorio.expenses.forEach( saida => {
      this.saidas[0].data.push(saida.valor);
      this.rotulosSaidas.push(moment(saida.registradoEm).format('DD/MM/YYYY'));
    });

    this.saidas[0].data.push(0);
    this.rotulosSaidas.push('');

    this.entradas[0].data.push(0);
    this.rotulosEntradas.push('');
  }

  public obterReceitas() {
    let id = this.router.url.split('/')[2];
    this.service.getRecipes(id).subscribe( response => {
      this.receitas = response;
    },
    erro => {
      this.errorMessage(erro);
    });
  }

  public download() {
    let id = this.router.url.split('/')[2];
    let mes = this.meses.indexOf(this.mesSelecionado);
    this.router.navigateByUrl(`/print${id}?month=${mes}&year=${this.anoSelecionado}`);
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