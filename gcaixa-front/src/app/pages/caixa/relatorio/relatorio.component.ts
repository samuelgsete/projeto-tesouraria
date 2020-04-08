import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RelatorioService } from 'src/app/shared/services/relatorio.service';
import { Relatorio } from 'src/app/shared/modelos/Relatorio';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  public report = new Relatorio();

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

  public years = [
    2018, 
    2019, 
    2020, 
    2021, 
    2022
  ];

  public monthSelected = 'Janeiro';
  public yearSelected = 2020;

  constructor(private servico: RelatorioService, private router: Router) {
    this.loadReport();
  }

  loadReport(){
    let id = this.router.url.split('/')[2]; 
    let monthIndex = this.months.indexOf(this.monthSelected);
    this.servico.findByDate(parseInt(id), monthIndex, this.yearSelected).subscribe( res => {
      this.report = res.body;
      console.log(this.report);
    });
  }

  ngOnInit() { }
}
