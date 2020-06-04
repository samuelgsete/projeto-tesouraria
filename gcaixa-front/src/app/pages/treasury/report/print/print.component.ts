import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Receitas } from 'src/app/shared/models/income.entity';
import { Relatorio } from 'src/app/shared/models/report.entity';
import { TreasuryService } from 'src/app/shared/services/treasury.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  public receitas = new Receitas();
  public relatorio = new Relatorio();
  public indicadorDeCarregamento = true;

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
    let id = this.router.url.split('/')[2];
    this.indicadorDeCarregamento = true;

    this.route.queryParams.subscribe( params => {

      let mes = parseInt(params['month']);
      let ano = parseInt(params['year']);

      this.service.obterRelatorioMensal(id, ano, mes).subscribe( response => {
        this.relatorio = response.body;
        this.indicadorDeCarregamento = false;
      }, error => {
        this.errorMessage(error);
      });
    })
  }

  public getIncomes(){
    let id = this.router.url.split('/')[2];
    this.service.getRecipes(id).subscribe( response => {
      this.receitas = response;
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
