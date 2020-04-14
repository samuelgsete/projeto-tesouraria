import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CaixaService } from 'src/app/shared/services/caixa.service';
import { Caixa } from 'src/app/shared/modelos/Caixa';
import { ToastrService } from 'ngx-toastr';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  public chartType: string = 'bar';
  public chartDatasets = [
    { data: [120.35, 144.60, 160.35, 175.65, 135, 195.85, 210.05, 201.45, 111.25, 140.8, 128.4, 131.1], label: 'ENTRADAS' },
    { data: [50, 20, 15, 80, 90, 10, 15, 220, 220, 130, 5, 180], label: 'SAIDAS' },
    { data: [30, 29, 22, 45, 16, 19, 10, 20, 22, 30, 50, 80], label: 'FIADOS' },
  ];
  public chartLabels = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  public chartColors = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(123, 137, 0, .2)',
      borderColor: 'rgba(123, 137, 0, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  public caixa = new Caixa();
  public dateFormat = new DateFormatPipe();
  public now = new Date().getFullYear();

  constructor(
          private router: Router, 
          private servico: CaixaService, 
          private toastr: ToastrService
  ) { 
    this.load();
  }

  load() {
    let id = this.router.url.split('/')[2];
    this.servico.findById(id).subscribe( resp => {
      let c: Caixa = resp
      if(c != null) {
        this.caixa = c;
      }
      else {
        this.router.navigateByUrl('/home');
        this.toastr.error('Nenhum caixa encontrado', 'Erro', {progressBar: true});
      } 
    }, e => {
      this.errorMessage(e);
    });
  }

  update(){   
    this.chartDatasets = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'ENTRADAS' },
      { data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'SAIDAS' },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'FIADOS' }
    ];
 
    /* Busca as entradas e saídas do ano corrente */
    let entradas = this.caixa.entradas.filter( e => {
      return this.dateFormat.transform(e.registro).indexOf(this.now) != -1;
    });

    let saidas = this.caixa.saidas.filter( s => {
      return this.dateFormat.transform(s.registro).indexOf(this.now) != -1;
    });

    let fiados = [];
    entradas.forEach( e => {
      e.creditos.forEach( c => {
        fiados.push(c);
      });
    });

    let valorEntradas = 0;
    let valorSaidas = 0;
    let valorFiados = 0;

    /* Calcula o valor total de entradas em cada mês virgente */
    this.chartLabels.forEach( (item, index) => {
      entradas.forEach( e => {
        if(this.isCurrent(index, e.registro)) {
          valorEntradas += e.valor;
        }
      });
      this.chartDatasets[0].data[index] = valorEntradas;
      valorEntradas = 0;
    });

    /* Calcula o valor total de saidas em cada mês virgente */
    this.chartLabels.forEach( (item, index) => {
      saidas.forEach( s => {
        if(this.isCurrent(index, s.registro)) {
          valorSaidas += s.valor;
        }
      });
      this.chartDatasets[1].data[index] = valorSaidas;
      valorSaidas = 0;
    });

    /* Calcula o valor total de fiados em cada mês virgente */
    this.chartLabels.forEach( (item, index) => {
      fiados.forEach( f => {
        let mes = parseInt(f.abertura.split('-')[1]);
        if(mes == index+1) {
          valorFiados+= f.valor;
        }
      });
      this.chartDatasets[2].data[index] = valorFiados;
      valorFiados= 0;
    });
  }

  /* Verifica se a movimentação (entrada/saida) pertence ao mês corrente */
  isCurrent(index, date) {
    let mes = parseInt(date.split('-')[1]);
    if(index + 1 == mes) {
      return true;
    }
    return false;
  }

  errorMessage(err: any) {
    if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.info('Necessário autenticação', 'Sessão expirada', { progressBar: true });
      localStorage.removeItem('id_token');
    }
    else {
      this.toastr.error(err.error.detalhes, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {}
}
