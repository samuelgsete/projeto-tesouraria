import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { Treasury } from 'src/app/shared/models/treasury.entity';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { Pagination} from 'src/app/shared/models/pagination.entity';
import { MaxInputMoneyValidator } from 'src/app/shared/validators/max-input-money.validator';
import { ResetStateFormValidator } from 'src/app/shared/validators/reset-state-form.validator';

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.scss']
})
export class TreasuryComponent implements OnInit {

  public f: FormGroup;
  public search: FormControl = new FormControl();

  @ViewChild('modalCreate', { static: false }) modalCreate: any;
  @ViewChild('modalUpdate', { static: false }) modalUpdate: any;

  public treasuries = [];
  public pagination = new Pagination();
  public loading = true;

  public constructor(
                private router: Router, 
                private _fb: FormBuilder, 
                private toastr: ToastrService, 
                private servico: TreasuryService
  ) { }

  public load(paginacao: Pagination) {
    this.loading = true;
    this.servico.findPaginate(paginacao).subscribe( response => {
      this.treasuries = response.body.data;
      this.pagination.count = response.body.count;
      this.loading = false;
    }, err => {
      this.errorMessage(err);
    });
  }

  public changePage(sense: boolean) {  
    if(sense) {
      this.pagination.nextPage();
    }
    else {
      this.pagination.previousPage();
    }
    this.load(this.pagination);
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
    }
  }

  public createOrUpdateTreasury(dados: Treasury) {
    let userId = parseInt(localStorage.getItem('user_id'));
    let treasury = new Treasury({
      id: dados.id,
      name: dados.name, 
      initialAmount: dados.initialAmount,
      currentBalance: dados.currentBalance,
      recipes: dados.recipes,
      expenses: dados.expenses,
      details: dados.details,
      userId: userId
    });
    
    if(!treasury.id) {
      this.servico.save(treasury).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.hideModalCreate();    
        this.load(new Pagination());  
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.servico.update(treasury).subscribe(res => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
        this.hideModalUpdate();
        this.load(new Pagination());
      }, err => {
        this.errorMessage(err);
      });
    }
  }

  public deleteTreasury(treasury: Treasury) {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.servico.remove(treasury.id).subscribe(r => {   
          this.toastr.success('Removido com sucesso!', 'Feito', {progressBar: true});
          this.load(new Pagination());
        }, e =>{
          this.errorMessage(e);
        })
      } 
    })
  }

  public hideModalCreate() {
    this.modalCreate.hide();
    this.f.reset();
  }

  public hideModalUpdate() {
    this.modalUpdate.hide();
    this.f.reset();
  }

  public showModalUpdate(treasury: Treasury) {
    this.f.patchValue({
      id: treasury.id,
      name: treasury.name,
      initialAmount: treasury.initialAmount,
      currentBalance: treasury.currentBalance,
      recipes: treasury.recipes,
      expenses: treasury.expenses,
      details: treasury.details,
      userId: treasury.userId
    });
    this.modalUpdate.show();
  }

  public addTransactions(id: number) {
    this.router.navigateByUrl(`transactions/${id}`);
  }

  public emitterReport(id: number) {
    this.router.navigateByUrl(`report/${id}`);
  }

  public showHistoric(id: number) {
    this.router.navigateByUrl(`historic/${id}`);
  }
  
  ngOnInit() {
    this.load(this.pagination);
    this.search.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      this.pagination.filter = value;
      this.load(this.pagination);
    });

    this.f = this._fb.group({
      id: [null],
      name:['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      initialAmount:['', [Validators.required, new MaxInputMoneyValidator()]],
      currentBalance:[0, []],
      details: [null, [Validators.minLength(4), Validators.maxLength(255), new ResetStateFormValidator()]],
      recipes: [[]],
      expenses: [[]],
      userId:[]
    });
  }
}