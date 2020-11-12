import { Component, Input, OnChanges, OnInit } from '@angular/core';

import * as moment from 'moment';
import { DateShowPipe } from 'src/app/shared/pipes/date-show.pipe';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html'
})
export class ReportChartComponent implements OnInit, OnChanges {

  @Input('transactions') public transactions: any[] = [];
  public dateShow = new DateShowPipe();

  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [
    { data: [] }
  ];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: []
    }
  ];
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

  public constructor() { }

  public feed() {
    this.chartDatasets = [
      { data: [] }
    ];
    this.chartLabels = [];
    this.chartColors = [
      {
        backgroundColor: []
      }
    ];

    this.transactions.forEach( transaction => {
      if(transaction.type == 'RECEITA') {
        this.chartColors[0].backgroundColor.push('rgb(51, 181, 229, .9)');
      }

      if(transaction.type == 'DESPESA') {
        this.chartColors[0].backgroundColor.push('rgb(255, 68, 68, .9)');
      }

      this.chartDatasets[0].data.push(transaction.value);
      this.chartLabels.push(
        `${transaction.description} \nEm ${this.dateShow.transform(moment(transaction.registeredIn).format('DD/MM/YYYY'))}`
      );
    });

    this.chartDatasets[0].data.push(0);
    this.chartLabels.push('');
  }

  ngOnInit(): void { }

  ngOnChanges(): void { this.feed(); }
}