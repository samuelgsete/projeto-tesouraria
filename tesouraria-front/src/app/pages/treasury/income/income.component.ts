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

  public constructor(
                        private readonly service: TreasuryService,
                        private readonly router: Router
                    )
  { 
    this.load();
  }

  public load() {
    let id = parseInt(this.router.url.split('/')[2]);
    
    this.service.getIncome(id).subscribe( response => {
      this.income = response;
    },
    erro => {
      console.log(erro);
    });
  }

  ngOnInit(): void {}
}