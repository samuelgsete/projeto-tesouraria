import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import * as moment from "moment";
import { Tesouraria } from 'src/app/shared/models/treasury.entity';
import { Credito } from 'src/app/shared/models/credit.entity';
import { Saida } from 'src/app/shared/models/expense.entity';
import { Entrada } from 'src/app/shared/models/recipe.entity';
import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { DateValidator } from 'src/app/shared/validators/date.validator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public f: FormGroup;
  public fsaidas: FormGroup;
  public fcreditos: FormGroup;

  public tesouraria: Tesouraria = new Tesouraria();
  public creditos: Credito[]= [];

  public rows: any[] = [];
  public indicadorDeCarregamento: boolean = true;
  public movimentacoesSelecionadas: any = [];
  public dateValidator = new DateValidator();
  
  constructor(private _fb: FormBuilder, private router: Router, private toastr: ToastrService, private servico: TreasuryService) { }
  
  load() {
    let id = this.router.url.split('/')[2];
    this.servico.findById(id).subscribe( resp => {
      let c: Tesouraria = resp
      if(c != null) {
        this.tesouraria = c;
        this.rows = [...c.entradas, ...c.saidas];    
        this.indicadorDeCarregamento = false;
      }
      else {
        this.router.navigateByUrl('/home');
        this.toastr.error('Nenhum caixa encontrado', 'Erro', {progressBar: true});
      } 
    }, erro => {
      this.errorMessage(erro);
    });
  }

  errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.info('Necessário autenticação', 'ERRO', { progressBar: true });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }

    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
    }
  }

  aoSelecionar(movimentacoes: any) {
    this.movimentacoesSelecionadas = movimentacoes.selected;
  }

  ocultarModalEntrada(modal: any) {
    this.resetarFormulario();
    modal.hide();
  }

  mostrarModalEntrada(modal: any) {
    this.resetarFormulario();
    modal.show();
  }

  mostrarModalSaida(modal: any) {
    this.resetarFormulario();
    modal.show();
  }

  ocultarModalAtualizarSaida(modal: any) {
    this.resetarFormularioSaidas();
    modal.hide();
  }

  resetarFormulario() {
    this.f.patchValue({
        id: null,
        descricao: '',
        valor: '',
        ofertante: null,
        registradoEm: moment().format('DDMMYYYY'),
        detalhes: null
    })
    this.creditos = [];
  }

  resetarFormularioSaidas() {
    this.fsaidas.patchValue({
      id: null,
      descricao: '',
      valor: '',
      registradoEm: moment().format('DDMMYYYY'),
      detalhes: null,
    });
  }

  salvarOuAtualizarEntrada(e: Entrada, modal: any) {
    let novaEntrada = new Entrada({
      id: e.id,
      descricao: e.descricao,
      valor: e.valor,
      ofertante: e.ofertante,
      tipo: 'RECEITA',
      detalhes: e.detalhes,
      registradoEm: moment(e.registradoEm, 'DDMMYYYY', true).toDate(),
      creditos: this.creditos
    });
    
    if(novaEntrada.id == null) {
      this.tesouraria.entradas.push(novaEntrada);
      this.servico.update(this.tesouraria).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load(); 
      }
      , erro => {
        let index = this.tesouraria.entradas.indexOf(novaEntrada);
        this.tesouraria.entradas.splice(index,1);
        this.errorMessage(erro);
      });
    }
    else {
      let entradaAtual = this.tesouraria.entradas.filter( entrada => {
        return entrada.id == novaEntrada.id;
      })[0];

      let indice = this.tesouraria.entradas.indexOf(entradaAtual);
      this.tesouraria.entradas[indice] = novaEntrada;

      this.servico.update(this.tesouraria).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }
      , erro => {
        let index = this.tesouraria.entradas.indexOf(novaEntrada);
        this.tesouraria.entradas.splice(index,1);
        this.errorMessage(erro);
      });
    }
    modal.hide();
    this.resetarFormulario();
  }

  salvarOuAtualizarSaida(s: Saida, modal: any) {
    let novaSaida: Saida = new Saida({
      id: s.id,
      descricao: s.descricao,
      valor: s.valor,
      tipo: 'DESPESA',
      detalhes: s.detalhes,
      registradoEm: moment(s.registradoEm, 'DDMMYYYY', true).toDate()
    });

    if(novaSaida.id == null) {
      this.tesouraria.saidas.push(novaSaida);
      this.servico.update(this.tesouraria).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load();  
      }
      , erro => {
        let index = this.tesouraria.saidas.indexOf(novaSaida);
        this.tesouraria.saidas.splice(index,1);
        this.errorMessage(erro);
      });
    }
    else {
      let saidaAtual = this.tesouraria.saidas.filter( saida => {
        return saida.id == novaSaida.id;
      })[0];

      let index = this.tesouraria.saidas.indexOf(saidaAtual);
      this.tesouraria.saidas[index] = novaSaida;

      this.servico.update(this.tesouraria).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }
      , erro => {
        let index = this.tesouraria.saidas.indexOf(novaSaida);
        this.tesouraria.saidas.splice(index,1);
        this.errorMessage(erro);
      });
    }
    modal.hide();
    this.resetarFormularioSaidas();
  }

  deletarMovimentacoesSelecionadas() {
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
        this.movimentacoesSelecionadas.forEach(item => {
          index = this.tesouraria.entradas.indexOf(item);
          if (index >= 0) {
            this.tesouraria.entradas.splice(index,1);
          } 
          index = this.tesouraria.saidas.indexOf(item);
          if (index >= 0) {
            this.tesouraria.saidas.splice(index,1);
          }
          this.servico.update(this.tesouraria).subscribe(res => {
            this.load();
            this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
          }
          , erro => {
            this.errorMessage(erro);
          }); 
        });
        this.movimentacoesSelecionadas = [];
      } 
    });
  }

  deletarMovimentacao(movimentacao: any) {
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
        index = this.tesouraria.entradas.indexOf(movimentacao);
        if(index >=0) {
          this.tesouraria.entradas.splice(index, 1);
        }
        index = this.tesouraria.saidas.indexOf(movimentacao);
        if(index >=0) {
          this.tesouraria.saidas.splice(index, 1);
        }
        this.servico.update(this.tesouraria).subscribe(res => {
          this.load();
          this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
        }
        , erro => {
          this.errorMessage(erro);
        });
      } 
    });
  }

  addCredito(form: any, modal: any){
    modal.hide();
    let credito = form.value;
    this.creditos.push(new Credito({
      titular: credito.titular,
      valor: credito.valor,
      telefone: credito.telefone,
      situacao: 'ABERTO'
    }));
    form.reset();
  }

  removerCredito(index: number, c: Credito) {
    this.creditos.splice(index, 1);
  }

  quitarCredito(c: Credito) {
    if(c.situacao  != 'ENCERRADO') {
      c.situacao = c.situacao === 'ABERTO' ? 'QUITADO' : 'ABERTO';
    }
  }

  setFormEntradaOuSaida(row: any, modalAtualizarEntrada: any, modalAtualizarSaida: any) {
    if(row.tipo === 'DESPESA') {
      this.fsaidas.patchValue({
        id: row.id,
        descricao: row.descricao,
        valor: row.valor,
        registradoEm: moment(row.registradoEm).format('DDMMYYYY'),
        detalhes: row.detalhes,
      });
      modalAtualizarSaida.show();
    }
    if(row.tipo === 'RECEITA') {
      this.f.patchValue({
        id: row.id,
        descricao: row.descricao,
        valor: row.valor,
        ofertante: row.ofertante,
        registradoEm: moment(row.registradoEm).format('DDMMYYYY'),
        detalhes: row.detalhes
      });
      this.creditos = row.creditos;
      modalAtualizarEntrada.show();
    }
  }

  limparForm(form: FormGroup) {
    form.reset();
    this.creditos = [];
  }

  ngOnInit() {
    this.load();
    this.f = this._fb.group({
      id: [null],
      descricao:['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      valor:[Validators.required],
      ofertante: [null, [Validators.minLength(2), Validators.maxLength(60)]],
      tipo: ['RECEITA'],
      registradoEm: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
      detalhes: [null, Validators.maxLength(255)],
    });

    this.fcreditos = this._fb.group({
      id: [null],
      titular: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      valor:['', Validators.required],
      registro: [''],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      situacao: ['']
    });

    this.fsaidas = this._fb.group({
      id: [null],
      descricao:['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      valor:['', Validators.required],
      tipo: ['DESPESA'],
      registradoEm: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
      detalhes: [null, Validators.maxLength(255)]
    });
  }
}