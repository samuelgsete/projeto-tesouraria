import { Component, OnInit, Input } from '@angular/core';

import { Treasury } from 'src/app/shared/models/treasury.entity';

@Component({
  selector: 'app-charts-treasury',
  templateUrl: './charts-treasury.component.html',
  styleUrls: ['./charts-treasury.component.scss']
})
export class ChartsTreasuryComponent implements OnInit {

  @Input('treasury') public treasury: Treasury = new Treasury();

  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [
    { data: []}
  ];
  public chartLabels: Array<any> = ['Receitas', 'Despesas', 'Faturamento', 'Montante inicial'];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgb(51, 181, 229, .5)',
        'rgb(255, 68, 68, .5)',
        'rgb(255, 187, 51, .5)',
        'rgb(43, 187, 173, .5)'
      ]
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

  private feedChart() {
    this.chartDatasets[0].data.push(this.treasury.incomeRecipes);
    this.chartDatasets[0].data.push(this.treasury.incomeExpenses);
    this.chartDatasets[0].data.push(this.treasury.currentBalance);
    this.chartDatasets[0].data.push(this.treasury.initialAmount);
    this.chartDatasets[0].data.push(0);
  }

  ngOnInit(): void {
    this.feedChart();
  }
}