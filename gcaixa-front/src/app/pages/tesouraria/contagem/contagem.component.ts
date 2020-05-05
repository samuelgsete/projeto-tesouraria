import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Contagem } from 'src/app/shared/modelos/Contagem';
import { Tesouraria } from 'src/app/shared/modelos/Tesouraria';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contagem',
  templateUrl: './contagem.component.html',
  styleUrls: ['./contagem.component.scss']
})
export class ContagemComponent implements OnInit {

  public f: FormGroup;

  public rows: Contagem[] = [];
  public tesouraria: Tesouraria;

  public indicadorDeCarregamento: boolean = true;
  public contagensSelecionadas: any = [];

  constructor(
              private router: Router, 
              private _fb: FormBuilder, 
              private toastr: ToastrService,
              private service: TesourariaService
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
    if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.info('Necessário autenticação', 'Sessão expirada', { progressBar: true });
      localStorage.removeItem('id_token');
    }
    else {
      this.toastr.error(err.error.detalhes, 'ERRO', { progressBar: true });
    }
  }

  salvarOuAtualizarContagem(contagem: Contagem, modal: any) {
    modal.hide();
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
      this.tesouraria.entradas.forEach((item, index) => {
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
    this.f.reset();
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
      registro: row.registro,
      caixa: row.caixa
    });
  }

  abrirModalCriar(modal: any) {
    this.f.reset();
    this.f.patchValue({
      saldoAtual: this.tesouraria.saldoAtual,
      saldoInicial: this.tesouraria.saldoInicial
    });
    modal.show();
  }

  ngOnInit() {
    this.f = this._fb.group({
      id: [null],
      saldoReal: ['', Validators.required],
      registro: [''],
      saldoAtual: [''],
      saldoInicial: ['']
    });
  }
}