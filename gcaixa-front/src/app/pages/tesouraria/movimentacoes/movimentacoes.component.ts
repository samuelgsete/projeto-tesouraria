import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tesouraria } from 'src/app/shared/modelos/Tesouraria';
import { Credito } from 'src/app/shared/modelos/Credito';
import { Saida } from 'src/app/shared/modelos/Saida';
import { Entrada } from 'src/app/shared/modelos/Entrada';
import Swal from 'sweetalert2';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.scss']
})
export class MovimentacoesComponent implements OnInit {

  public f: FormGroup;
  public fsaidas: FormGroup;
  public fcreditos: FormGroup;

  public tesouraria: Tesouraria = new Tesouraria();
  public creditos: Credito[]= [];

  public rows: any = [];
  public indicadorDeCarregamento: boolean = true;
  public movimentacoesSelecionadas: any = [];

  public dateFormat = new DateFormatPipe();
  
  constructor(private _fb: FormBuilder, private router: Router, private toastr: ToastrService, private servico: TesourariaService) { }
  
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
      this.router.navigateByUrl('/home');
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
    this.f.reset();
    this.creditos = [];
  }

  resetarFormularioSaidas() {
    this.fsaidas.reset();
  }

  salvarOuAtualizarEntrada(e: Entrada, modal: any) {
    let entrada = new Entrada({
      id: e.id,
      descricao: e.descricao,
      valor: e.valor,
      ofertante: e.ofertante,
      tipo: 'ENTRADA',
      detalhes: e.detalhes,
      creditos: this.creditos
    });

    if(entrada.id == null) {
      this.tesouraria.entradas.push(entrada);
      this.servico.update(this.tesouraria).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load();      
      }, e => {
        this.errorMessage(e);
      });
    }
    else {
      let i = 0;
      this.tesouraria.entradas.forEach((item, index) => {
        if(item.id === entrada.id) {
          i = index;
        }
      });
      this.tesouraria.entradas[i] = entrada;
      console.log(this.tesouraria);
      this.servico.update(this.tesouraria).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }, e => {
        this.errorMessage(e);
      });
    }
    modal.hide();
    this.resetarFormulario();
  }

  salvarOuAtualizarSaida(s: Saida, modal: any) {
    let saida: Saida = new Saida({
      id: s.id,
      data: s.registro,
      descricao: s.descricao,
      valor: s.valor,
      tipo: 'SAIDA',
      motivo: s.detalhes
    });

    if(saida.id == null) {
      this.tesouraria.saidas.push(saida);
      this.servico.update(this.tesouraria).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load();      
      }, e => {
        this.errorMessage(e);
      });
    }
    else {
      let i = 0;
      this.tesouraria.saidas.forEach((item, index) => {
        if(item.id === saida.id) {
          i = index;
        }
      });
      this.tesouraria.saidas.splice(i, 1);
      this.tesouraria.saidas.push(saida);
      this.servico.update(this.tesouraria).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }, e => {
        this.errorMessage(e);
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
          }, e => {
            this.errorMessage(e);
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
        }, e => {
          this.errorMessage(e);
        });
      } 
    });
  }

  addCredito(form: any, modal: any){
    modal.hide();
    let data = form.value
    this.creditos.push(new Credito({
      id: data.id,
      titular: data.titular,
      valor: data.valor,
      abertura: new Date().toISOString(),
      situacao: 'ABERTO'
    }));
    form.reset();
  }

  removerCredito(index: number, c: Credito) {
    this.creditos.splice(index, 1);
  }

  quitarCredito(c: Credito) {
    c.situacao = c.situacao === 'ABERTO' ? 'QUITADO' : 'ABERTO';
  }

  setFormEntradaOuSaida(row: any, modalAtualizarEntrada: any, modalAtualizarSaida: any) {
    if(row.tipo === 'SAIDA') {
      this.fsaidas.patchValue({
        id: row.id,
        descricao: row.descricao,
        valor: row.valor,
        registro: this.dateFormat.transform(row.registro),
        motivo: row.motivo,
      });
      modalAtualizarSaida.show();
    }
    if(row.tipo === 'ENTRADA') {
      this.f.patchValue({
        id: row.id,
        descricao: row.descricao,
        valor: row.valor,
        ofertante: row.ofertante,
        registro: this.dateFormat.transform(row.registro),
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
      descricao:['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      valor:[Validators.required],
      ofertante: ['', [Validators.minLength(4), Validators.maxLength(50)]],
      tipo: [''],
      registro: [''],
      detalhes: [null, Validators.maxLength(250)],
    });

    this.fcreditos = this._fb.group({
      id: [null],
      titular: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      valor:['', Validators.required],
      situacao: ['']
    });

    this.fsaidas = this._fb.group({
      id: [null],
      descricao:['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      valor:[Validators.required],
      tipo: [''],
      registro: [''],
      motivo: [null, Validators.maxLength(200)]
    });
  }
}
