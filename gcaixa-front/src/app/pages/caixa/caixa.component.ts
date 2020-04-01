import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  @ViewChild('modalCadastro', null) modalCadastrar: any;
  @ViewChild('modalEditar', null) modalEditar: any;

  public caixas = [];

  public paginacao = new Paginacao();

  constructor(private router: Router, private _fb: FormBuilder, private toastr: ToastrService, private servico: CaixaService) { 
    this.load();
  }

  load() {
    this.servico.findPaginate(this.paginacao).subscribe( res => {
      this.paginacao.count = res.body.count;
      console.log(this.paginacao);
      this.caixas = res.body.data;
    }, e => {
      console.log(e.message);
    });
  }

  proximaPagina(page: number) {
    console.log(page);
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
        this.load(); 
        this.ocultarModalCadastrar();      
      }, e => {
        this.toastr.error(e.error.detalhes, '', { progressBar: true });
      });
    }
    else {
      this.servico.update(caixa).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }, e => {
        this.toastr.error("Não foi possivel atualizar",'ERRO', { progressBar: true })
      });
      this.ocultarModalEditar();
    }
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
          this.load();
        })
        , e => {
          this.toastr.error('Não foi possível remover', 'ERRO', {progressBar: true});
          }; 
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
