import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import * as moment from "moment";

import { Expense } from 'src/app/shared/models/expense.entity';
import { Recipe } from 'src/app/shared/models/recipe.entity';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { TransactionType } from 'src/app/shared/models/enums/transaction-type.enum';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { MaxInputMoneyValidator } from 'src/app/shared/validators/max-input-money.validator';
import { ResetStateFormValidator } from 'src/app/shared/validators/reset-state-form.validator';
import { Pagination } from 'src/app/shared/models/pagination.entity';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public formRecipes: FormGroup;
  public formExpenses: FormGroup;

  public treasuryId: number = 0;

  public rows: any[] = [];
  public loading = true;
  public transactionsSelected: any = [];
  public transactionType = TransactionType;
  public pagination = new Pagination();

  public yearSelected = 2021;
  public monthSelected = 'Todos os meses';
  public typeTransactionSelected = 'RECEITA E DESPESA';

  public years = [ 2019, 2020, 2021 ];
  public months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro','Todos os meses'
  ];
  public types = ['RECEITA', 'DESPESA', 'RECEITA E DESPESA'];
  public recipeOptions = ['Venda', 'Oferta do culto', 'Contribuinte', 'Outros'];

  @ViewChild('income', { static: true }) incomeComponent: any;
  
  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router, 
                      private readonly toastr: ToastrService, 
                      private readonly transactionsService: TransactionsService
  ) {}
  
  public load() {
    this.incomeComponent.load();
    this.loading = true;
    const month = this.months.indexOf(this.monthSelected);
    this.transactionsService.findPaginate(this.treasuryId, this.typeTransactionSelected, this.yearSelected, month, this.pagination.pageCurrent).subscribe( response => {
      this.rows = response.body.data;
      this.pagination.count = response.body.count;
      this.loading = false;
    }, err => {
      this.errorMessage(err);
    });
  }

  public filterTransactions() {
    this.pagination = new Pagination();
    this.load();
  }

  public changePage(sense: boolean) {  
    if(sense) {
      this.pagination.nextPage();
    }
    else {
      this.pagination.previousPage();
    }
    this.load();
  }

  public setPage(event) {
    this.pagination.pageCurrent = event.offset + 1;
    this.load();
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

  public whenSelecting(transactions: any) {
    this.transactionsSelected = transactions.selected;
  }

  public hideModalRecipe(modal: any) {
    this.resetFormRecipes();
    modal.hide();
  }

  public showModalRecipe(modal: any) {
    this.resetFormRecipes();
    modal.show();
  }

  public showModalExpense(modal: any) {
    this.resetFormExpenses;
    modal.show();
  }

  public hideModalUpdateExpense(modal: any) {
    this.resetFormExpenses();
    modal.hide();
  }

  public resetFormRecipes() {
    this.formRecipes.reset();
    this.formRecipes.patchValue({
      registeredIn: moment().format('DDMMYYYY'),
    });
  }

  public resetFormExpenses() {
    this.formExpenses.reset();
    this.formExpenses.patchValue({ 
      registeredIn: moment().format('DDMMYYYY'),
    });
  }

  public saveOrUpdateRecipe(recipe: Recipe, modal: any) {
    let newRecipe = new Recipe({
      id: recipe.id,
      description: recipe.description,
      value: recipe.value,
      offerer: recipe.offerer,
      type: TransactionType.RECIPE,
      recipeType: recipe.recipeType,
      details: recipe.details,
      registeredIn: moment(recipe.registeredIn, 'DDMMYYYY', true).toDate()
    });
    
    if(!newRecipe.id) {
      this.transactionsService.createRecipe(this.treasuryId, newRecipe).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load(); 
      }
      , err => {
        this.errorMessage(err);
      });
    }
    else { 
      this.transactionsService.updateRecipe(this.treasuryId, newRecipe).subscribe(res => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
        this.load();
      }
      , err => {
        this.errorMessage(err);
      });
    }
    modal.hide();
    this.resetFormRecipes();
  }

  public saveOrUpdateExpense(expense: Expense, modal: any) {
    let newExpense: Expense = new Expense({
      id: expense.id,
      description: expense.description,
      value: expense.value,
      type: TransactionType.EXPENSE,
      details: expense.details,
      registeredIn: moment(expense.registeredIn, 'DDMMYYYY', true).toDate()
    });

    if(!newExpense.id) {
      this.transactionsService.createExpense(this.treasuryId, newExpense).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load();  
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.transactionsService.updateExpense(this.treasuryId, newExpense).subscribe(res => {
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
        this.load();
      }, err => {
        this.errorMessage(err);
      });
    }
    modal.hide();
    this.resetFormExpenses();
  }

  public deleteTransactionsSelected() {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.transactionsSelected.forEach(transaction => {
          if(transaction.type == TransactionType.RECIPE) {
            this.transactionsService.deleteRecipe(this.treasuryId, transaction.id).subscribe(res => {
              this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
              this.load();
            }, err => {
              this.errorMessage(err);
            });
          } else {
            this.transactionsService.deleteExpense(this.treasuryId, transaction.id).subscribe(res => {
              this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
              this.load();
            }, err => {
              this.errorMessage(err);
            });
          }
        });
        this.transactionsSelected = [];
      } 
    });
  }

  public deleteTransaction(transaction: any) {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        if(transaction.type == TransactionType.RECIPE) {
          this.transactionsService.deleteRecipe(this.treasuryId, transaction.id).subscribe(res => {
            this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
            this.load();
          }, err => {
            this.errorMessage(err);
          });
        } else {
          this.transactionsService.deleteExpense(this.treasuryId, transaction.id).subscribe(res => {
            this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
            this.load();
          }, err => {
            this.errorMessage(err);
          });
        }
      } 
    });
  }

  public setFormRecipeOrExpense(row: any, modalUpdateRecipe: any, modalUpdateExpense: any) {
    if(row.type === TransactionType.EXPENSE) {
      this.formExpenses.patchValue({
        id: row.id,
        description: row.description,
        value: row.value,
        registeredIn: moment(row.registeredIn).format('DDMMYYYY'),
        details: row.details,
      });
      modalUpdateExpense.show();
    }
    if(row.type === TransactionType.RECIPE) {
      this.formRecipes.patchValue({
        id: row.id,
        description: row.description,
        value: row.value,
        recipeType: row.recipeType,
        offerer: row.offerer,
        registeredIn: moment(row.registeredIn).format('DDMMYYYY'),
        details: row.details
      });
      modalUpdateRecipe.show();
    }
  }

  ngOnInit() {
    this.treasuryId = parseInt(this.router.url.split('/')[2]);
    this.load();
    this.formRecipes = this._fb.group({
      id: [null],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      value: ['', [Validators.required, new MaxInputMoneyValidator()]],
      recipeType: ['', Validators.required],
      offerer: [null, [Validators.minLength(4), Validators.maxLength(60), new ResetStateFormValidator()]],
      registeredIn: [moment().format('DDMMYYYY'), [Validators.required, new DateValidator().validate()]],
      details: [null, [Validators.minLength(4), Validators.maxLength(255), new ResetStateFormValidator()]],
    });

    this.formExpenses = this._fb.group({
      id: [null],
      description:['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      value:['', [Validators.required, new MaxInputMoneyValidator()]],
      registeredIn: [moment().format('DDMMYYYY'), [Validators.required, new DateValidator().validate()]],
      details: [null, [Validators.minLength(4), Validators.maxLength(255), new ResetStateFormValidator()]]
    });
  }
}