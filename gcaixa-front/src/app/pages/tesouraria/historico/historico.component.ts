import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { Tesouraria } from 'src/app/shared/modelos/Tesouraria';
import { ToastrService } from 'ngx-toastr';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  public chartType: string = 'bar';
  public chartDatasets1 = [
    { data: [120.35, 144.60, 160.35, 175.65, 135, 195.85, 210.05, 201.45, 111.25, 140.8, 128.4, 131.1], label: 'ENTRADAS' },
    { data: [50, 20, 15, 80, 90, 10, 15, 220, 220, 130, 5, 180], label: 'SAIDAS' },
    { data: [30, 29, 22, 45, 16, 19, 10, 20, 22, 30, 50, 80], label: 'FIADOS' },
  ];

  public chartDatasets2 = [
    { data: [120.35, 144.60, 160.35, 175.65, 135, 195.85, 210.05, 201.45, 111.25, 140.8, 128.4, 131.1], label: 'SALDO REAL' },
    { data: [50, 20, 15, 80, 90, 10, 15, 220, 220, 130, 5, 180], label: 'SALDO ATUAL' },
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

  public tesouraria = new Tesouraria();
  public dateFormat = new DateFormatPipe();
  public now = new Date().getFullYear();

  constructor(
          private router: Router, 
          private servico: TesourariaService, 
          private toastr: ToastrService
  ) { 

    this.load();
  }

  load() {
    let id = this.router.url.split('/')[2];
    this.servico.findById(id).subscribe( resp => {
      let c: Tesouraria = resp
      if(c != null) {
        this.tesouraria = c;
        this.plotarGraficoMovimentacoes();
        this.plotarGraficoContagens();
      }
      else {
        this.router.navigateByUrl('/home');
        this.toastr.error('Nenhum caixa encontrado', 'Erro', {progressBar: true});
      } 
    }, e => {
      this.errorMessage(e);
    });
  }

  plotarGraficoMovimentacoes(){   
    this.chartDatasets1 = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'ENTRADAS' },
      { data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'SAIDAS' },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'FIADOS' }
    ];
 
    /* Busca as entradas e saídas do ano corrente */
    let entradas = this.tesouraria.entradas.filter( e => {
      return this.dateFormat.transform(e.registro).indexOf(this.now) != -1;
    });

    let saidas = this.tesouraria.saidas.filter( s => {
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
      this.chartDatasets1[0].data[index] = valorEntradas;
      valorEntradas = 0;
    });

    /* Calcula o valor total de saidas em cada mês virgente */
    this.chartLabels.forEach( (item, index) => {
      saidas.forEach( s => {
        if(this.isCurrent(index, s.registro)) {
          valorSaidas += s.valor;
        }
      });
      this.chartDatasets1[1].data[index] = valorSaidas;
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
      this.chartDatasets1[2].data[index] = valorFiados;
      valorFiados= 0;
    });
  }

  /* Verifica se a movimentação (entrada/saida) pertence ao mês corrente */
  isCurrent(index: number, date: any) {
    let mes = parseInt(date.split('-')[1]);
    if(index + 1 == mes) {
      return true;
    }
    return false;
  }

  plotarGraficoContagens() {
    this.chartDatasets2 = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'SALDO REAL' },
      { data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'SALDO VIRTUAL' },
    ];
    /* Filtra as contagens do ano atual */
    let contagens = this.tesouraria.contagens.filter( c => {
      return this.dateFormat.transform(c.registro).indexOf(this.now) != -1;
    });
    
    this.chartLabels.forEach( (item, index) => {
      contagens.forEach( c => {
        let mes = parseInt(this.dateFormat.transform(c.registro).split('/')[1]);
        if(mes == index+1) {
          this.chartDatasets2[0].data[index] = c.saldoReal;
          this.chartDatasets2[1].data[index] = this.calcularSaldoAteOmesCorrente(this.tesouraria, mes, this.now);
        }
      });  
    });
  }

  calcularSaldoAteOmesCorrente(tesouraria: Tesouraria, mes: number, ano: number) {
    let saldo =tesouraria.saldoInicial;

    let _entradas = this.tesouraria.entradas.filter( e => {
      const [d, m, a] = this.dateFormat.transform(e.registro).split('/');
      return parseInt(m) <= mes  && ano == parseInt(a);
    });
    
    let _saidas = this.tesouraria.saidas.filter( s => {
      const [d, m, a] = this.dateFormat.transform(s.registro).split('/');
      return parseInt(m) <= mes  && ano == parseInt(a);
    });

    _entradas.forEach( e => {
      saldo +=e.valor;
    });

    _saidas.forEach( s => {
      saldo -=s.valor;
    });
    return saldo;
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
