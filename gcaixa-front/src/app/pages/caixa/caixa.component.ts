import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { Caixa } from 'src/app/shared/modelos/Caixa';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CaixaService } from 'src/app/shared/services/caixa.service';
import { Paginacao } from 'src/app/shared/modelos/paginacao';


@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit {

  public f: FormGroup;
  public pesquisar: FormControl = new FormControl();

  @ViewChild('modalCadastro', null) modalCadastrar: any;
  @ViewChild('modalEditar', null) modalEditar: any;

  public caixas = [];
  public paginacao = new Paginacao();

  constructor(private router: Router, private _fb: FormBuilder, private toastr: ToastrService, private servico: CaixaService) { 
    this.load(this.paginacao);
    this.pesquisar.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      this.load(new Paginacao({ filter: value }));
    });
  }

  load(paginacao: Paginacao) {
    this.servico.findPaginate(paginacao).subscribe( res => {
      this.caixas = res.body.data;
      paginacao.count = res.body.count;
    }, e => {
      this.errorMessage(e);
    });
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

  trocarPagina(sentido: boolean) {
    if(sentido){
      this.paginacao.nextPage();
    }
    else {
      this.paginacao.previousPage();
    }
    this.load(this.paginacao);
  }

  cadastrarOuAtualizarCaixa(dados: Caixa) {
    let caixa = new Caixa({
      id: dados.id,
      nome: dados.nome, 
      saldoAtual: dados.saldoAtual,
      saldoInicial: dados.saldoInicial,
      entradas: dados.entradas,
      saidas: dados.saidas,
      observacoes: dados.observacoes
    });
    if(caixa.id == null) {
      this.servico.save(caixa).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.ocultarModalCadastrar();      
      }, e => {
        this.errorMessage(e);
      });
    }
    else {
      this.servico.update(caixa).subscribe(res => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }, e => {
        this.errorMessage(e);
      });
      this.ocultarModalEditar();
    }
    this.paginacao = new Paginacao();
    this.load(this.paginacao); 
    this.f.reset();
  }

  deletarCaixa(c: Caixa) {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.servico.remove(c.id).subscribe(r => {   
          this.toastr.success('Removido com sucesso!', 'Feito', {progressBar: true});
          this.paginacao = new Paginacao();
          this.load(this.paginacao);
        }, e =>{
          this.errorMessage(e);
        })
      } 
    })
  }

  ocultarModalCadastrar() {
    this.modalCadastrar.hide();
    this.f.reset();
  }

  ocultarModalEditar() {
    this.modalEditar.hide();
    this.f.reset();
  }

  abirModalEditar(caixa: Caixa) {
    this.f.patchValue({
      id: caixa.id,
      nome: caixa.nome,
      saldoAtual: caixa.saldoAtual,
      saldoInicial: caixa.saldoInicial,
      entradas: caixa.entradas,
      saidas: caixa.saidas,
      observacoes: caixa.observacoes
    })
    this.modalEditar.show();
  }

  abirCaixa(id: number) {
    this.router.navigateByUrl('movimentacoes/' + id);
  }

  emitirRelatorio(id: number) {
    this.router.navigateByUrl(`relatorio/${id}`);
  }

  exibirGrafico(id: number) {
    this.router.navigateByUrl(`grafico/${id}`);
  }

  ngOnInit() {
    this.f = this._fb.group({
      id: [null],
      nome:['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      saldoInicial:['', []],
      saldoAtual:['', []],
      observacoes: [null, [Validators.minLength(4), Validators.maxLength(200)]],
      entradas: [[]],
      saidas: [[]],
    });
  }
}
