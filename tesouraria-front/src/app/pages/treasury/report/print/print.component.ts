import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Income } from 'src/app/shared/models/income.entity';
import { Report } from 'src/app/shared/models/report.entity';
import { TreasuryService } from 'src/app/shared/services/treasury.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  public income = new Income();
  public report = new Report();
  public loading = true;

  public constructor(
                      private service: TreasuryService,
                      private router: Router,
                      private route: ActivatedRoute,
                      private toastr: ToastrService
  ) { 
    this.getIncomes();
    this.getTransactions();
  }

  public getTransactions() {
    let id = parseInt(this.router.url.split('/')[2]);
    this.loading = true;
  
    this.route.queryParams.subscribe( params => {
      const month = parseInt(params['month']);
      const year = parseInt(params['year']);

      this.service.getReport(id, year, month).subscribe( response => {
        this.report = response.body;
        console.log(response.body);
        this.loading = false;
      }, 
      error => {
        this.errorMessage(error);
      });
    })
  }

  public getIncomes(){
    let id = parseInt(this.router.url.split('/')[2]);
    this.service.getIncome(id).subscribe( response => {
      this.income = response;
    },
    erro => {
      this.errorMessage(erro);
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

  ngOnInit(): void {}
}
