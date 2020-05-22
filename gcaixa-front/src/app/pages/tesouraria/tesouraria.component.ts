import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { Tesouraria } from 'src/app/shared/modelos/Tesouraria';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TesourariaService } from 'src/app/shared/services/tesouraria.service';
import { Paginacao } from 'src/app/shared/modelos/paginacao';
import { PaginationService } from 'src/app/shared/pagination/pagination.service';


@Component({
  selector: 'app-tesouraria',
  templateUrl: './tesouraria.component.html',
  styleUrls: ['./tesouraria.component.scss']
})
export class TesourariaComponent implements OnInit {

  public f: FormGroup;
  public pesquisar: FormControl = new FormControl();

  @ViewChild('modalCadastro', null) modalCadastrar: any;
  @ViewChild('modalEditar', null) modalEditar: any;
  public tesourarias = [];
  public paginacao = new Paginacao();
  public indicadorDeCarregamento = true;

  constructor(private router: Router, private _fb: FormBuilder, private toastr: ToastrService, private servico: TesourariaService, private paginationService: PaginationService) { 
  }

  load(paginacao: Paginacao) {
    this.servico.findPaginate(paginacao).subscribe( res => {
      this.tesourarias = res.body.data;
      this.paginationService.loader(res.body.count, paginacao.pageCurrent);
      this.indicadorDeCarregamento = false;
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

  changePage(pagination: any) {
    this.paginacao.pageCurrent = pagination.pageCurrent.label;
    this.load(this.paginacao);
  }

  cadastrarOuAtualizarTesouraria(dados: Tesouraria) {
    let userId = localStorage.getItem('user_id');
    let tesouraria = new Tesouraria({
      id: dados.id,
      nome: dados.nome, 
      saldoAtual: dados.saldoAtual,
      saldoInicial: dados.saldoInicial,
      entradas: dados.entradas,
      saidas: dados.saidas,
      contagens: dados.contagens,
      observacoes: dados.detalhes,
      userId: userId
    });
    
    if(tesouraria.id == null) {
      this.servico.save(tesouraria).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.ocultarModalCadastrar();    
        this.reload();  
      }, e => {
        this.errorMessage(e);
      });
    }
    else {
      this.servico.update(tesouraria).subscribe(res => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
        this.ocultarModalEditar();
        this.reload();
      }, e => {
        this.errorMessage(e);
      });
      
    }
  }

  reload() {
    this.paginacao = new Paginacao();
    this.load(this.paginacao); 
    this.f.reset();
  }

  deletarTesouraria(c: Tesouraria) {
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

  abrirModalEditar(tesouraria: Tesouraria) {
    this.f.patchValue({
      id: tesouraria.id,
      nome: tesouraria.nome,
      saldoAtual: tesouraria.saldoAtual,
      saldoInicial: tesouraria.saldoInicial,
      entradas: tesouraria.entradas,
      saidas: tesouraria.saidas,
      contagens: tesouraria.contagens,
      observacoes: tesouraria.detalhes,
      userId: tesouraria.userId
    });
    this.modalEditar.show();
  }

  abrirTesouraria(id: number) {
    this.router.navigateByUrl('movimentacoes/' + id);
  }

  emitirRelatorio(id: number) {
    this.router.navigateByUrl(`relatorio/${id}`);
  }

  exibirHistorico(id: number) {
    this.router.navigateByUrl(`historico/${id}`);
  }

  efetuarContagem(id: number) { this.router.navigateByUrl(`contagem/${id}`) }

  ngOnInit() {
    this.load(this.paginacao);
    this.pesquisar.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      this.paginacao.filter = value;
      this.load(this.paginacao);
    });

    this.f = this._fb.group({
      id: [null],
      nome:['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      saldoInicial:['', [Validators.required]],
      saldoAtual:['', []],
      detalhes: [null, [Validators.minLength(4), Validators.maxLength(200)]],
      entradas: [[]],
      contagens: [[]],
      saidas: [[]],
      userId:[]
    });
  }
}
