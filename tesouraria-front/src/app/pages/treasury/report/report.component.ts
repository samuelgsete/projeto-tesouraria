import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Income } from 'src/app/shared/models/income.entity';
import { Report } from 'src/app/shared/models/report.entity';
import { ReportService } from 'src/app/shared/services/report.service';
import { DateShowPipe } from 'src/app/shared/pipes/date-show.pipe';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public reports: Report[] = [];
  public income = new Income();
  public loading = true;
  public dateShow = new DateShowPipe();

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
    'Outubro', 
    'Novembro',
    'Dezembro',
    "Todos os meses"
  ];

  public monthsMobile = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril', 
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro', 
    'Novembro',
    'Dezembro'
  ];

  public years = [ 2020, 2021, 2022 ];
  public monthSelected = 'Janeiro';
  public yearSelected = 2020;

  public constructor(
                        private service: ReportService,
                        private router: Router,
                        private toastr: ToastrService
                    ) 
  { 
    this.getReport();
  }
 
  public getReport() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.months.indexOf(this.monthSelected);
    this.loading = true;
    this.service.getReport(id, this.yearSelected, month).subscribe( response => { 
        this.reports = response.body;
    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  public getReportMobile() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.monthsMobile.indexOf(this.monthSelected);
    this.loading = true;
    this.service.getReport(id, this.yearSelected, month).subscribe( response => { 
      this.reports = response.body;
    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }

  public download() {
    let id = parseInt(this.router.url.split('/')[2]);
    let month = this.months.indexOf(this.monthSelected);
    this.loading = true;
    this.service.downloadReport(id, this.yearSelected, month).subscribe( res => {
      const newWin = open();
      newWin.document.write(res.body);
    }, error => {
      this.errorMessage(error);
    }).add( () => {
      this.loading = false;
    });
  }
  
  private errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }
    
    else if(err.status == 401) {
      this.router.navigateByUrl('user/auth');
      this.toastr.error('Necessário autenticação', 'Sessão expirada', { progressBar: true, positionClass: 'toast-bottom-center' });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }
    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {}
}