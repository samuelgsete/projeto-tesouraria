import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Income } from 'src/app/shared/models/income.entity';
import { TreasuryService } from 'src/app/shared/services/treasury.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  public income = new Income();

  public constructor(private readonly router: Router, private readonly tresuryService: TreasuryService) {}

  public load() {
   const treasuryId = parseInt(this.router.url.split('/')[2]);
   this.tresuryService.getResume(treasuryId).subscribe( response => {
    this.income = response;
   }, err =>{
      console.log('Ocorreu um de carregamento de dados');
   });
  }

  ngOnInit(): void {
    this.load();
  }
}