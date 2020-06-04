import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contagem } from 'src/app/shared/models/inventory.entity';
import { Tesouraria } from 'src/app/shared/models/treasury.entity';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreasuryService } from 'src/app/shared/services/treasury.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { DateValidator } from 'src/app/shared/validators/date.validator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public f: FormGroup;

  public rows: Contagem[] = [];
  public tesouraria: Tesouraria = new Tesouraria();

  public indicadorDeCarregamento: boolean = true;
  public contagensSelecionadas: any = [];
  public dateValidator = new DateValidator();

  constructor(
              private router: Router, 
              private _fb: FormBuilder, 
              private toastr: ToastrService,
              private service: TreasuryService
            ) 
  {
    this.load();
  }

  aoSelecionar(contagem: any) { this.contagensSelecionadas = contagem.selected }

  load() {
    let id = this.router.url.split('/')[2];
    this.service.findById(id).subscribe( res => {
      this.tesouraria = res;
      this.rows = this.tesouraria.contagens;
      this.indicadorDeCarregamento = false;
    }, e => {
      this.errorMessage(e);
    })
  }

  errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.info('Necessário autenticação', 'Sessão expirada', { progressBar: true });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }

    else {
      this.toastr.error(err.error.detalhes, 'ERRO', { progressBar: true });
    }
  }

  salvarOuAtualizarContagem(c: Contagem, modal: any) {
    const contagem = new Contagem({
      id: c.id,
      saldoReal: c.saldoReal,
      registradoEm: moment(c.registradoEm, 'DDMMYYYY', true).toDate()
    });

    if(contagem.id == null) {
      this.tesouraria.contagens.push(contagem);
      this.service.update(this.tesouraria).subscribe( res => {
        this.toastr.success('Cadastrado com sucesso', 'Tudo ok!', { progressBar: true });
        this.load();
      }, e => {
        this.errorMessage(e);
      });
    }
    else {
      let i = 0;
      this.tesouraria.contagens.forEach((item, index) => {
        if(item.id === contagem.id) {
          i = index;
        }
      });
      this.tesouraria.contagens[i] = contagem;
      this.service.update(this.tesouraria).subscribe( res => {
        this.toastr.success('Atalizado com sucesso', 'Tudo ok!', { progressBar: true });
        this.load();
      }, e => {
        this.errorMessage(e);
      });
    }
    modal.hide();
  }

  deletarContagensSelecionadas() {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        let index = 0;
        this.contagensSelecionadas.forEach(item => {
          index = this.tesouraria.contagens.indexOf(item);
          if (index >= 0) {
            this.tesouraria.contagens.splice(index,1);
          } 
          this.service.update(this.tesouraria).subscribe(res => {
            this.load();
            this.toastr.success('Removido com sucesso', 'Tudo ok!', { progressBar: true });
          }, e => {
            this.errorMessage(e);
          }); 
        });
        this.contagensSelecionadas = [];
      } 
    });
  }

  deletarContagem(contagem: any) {
    let index = 0;
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        index = this.tesouraria.contagens.indexOf(contagem);
        if(index >=0) {
          this.tesouraria.contagens.splice(index, 1);
        }
        this.service.update(this.tesouraria).subscribe( res => {
          this.toastr.success('Removido com sucesso', 'Tudo ok!', { progressBar: true });
          this.load();
        }, e => {
          this.errorMessage(e);
        });
        this.contagensSelecionadas = [];
      } 
    });
  }

  abirModalEditar(row: any, modal: any) {
    modal.show();
    this.f.patchValue({
      id: row.id,
      saldoReal: row.saldoReal,
      saldoAtual: this.tesouraria.saldoAtual,
      saldoInicial: this.tesouraria.saldoInicial,
      registradoEm: moment(row.registradoEm).format('DDMMYYYY'),
      caixa: row.caixa
    });
  }

  abrirModalCriar(modal: any) {
    this.f.reset();
    this.f.patchValue({
      registradoEm: moment().format('DDMMYYYY'),
      saldoAtual: this.tesouraria.saldoAtual,
      saldoInicial: this.tesouraria.saldoInicial
    });
    modal.show();
  }

  ngOnInit() {
    this.f = this._fb.group({
      id: [null],
      saldoReal: ['', Validators.required],
      registradoEm: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
      saldoAtual: [''],
      saldoInicial: ['']
    });
  }
}