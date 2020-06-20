import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import * as moment from "moment";

import { Credit } from 'src/app/shared/models/credit.entity';
import { Expense } from 'src/app/shared/models/expense.entity';
import { Recipe } from 'src/app/shared/models/recipe.entity';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { StatusType } from 'src/app/shared/models/enums/status-type.enum';
import { TransactionType } from 'src/app/shared/models/enums/transaction-type.enum';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public formRecipes: FormGroup;
  public formExpenses: FormGroup;
  public formCredits: FormGroup;

  public treasuryId: number = 0;
  public credits: Credit[] = [];

  public rows: any[] = [];
  public loading = true;
  public transactionsSelected: any = [];
  public dateValidator = new DateValidator();
  public transactionType = TransactionType;

  public yearSelected = 2020;
  public monthSelected = 'Todos os meses';
  public typeTransactionSelected = 'RECEITA E DESPESA';

  public years = [ 2019, 2020, 2021 ];
  public months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro','Todos os meses'
  ];
  public types = ['RECEITA', 'DESPESA', 'RECEITA E DESPESA'];

  @ViewChild('income', { static: true }) incomeComponent: any;
  
  public constructor(
                      private readonly _fb: FormBuilder, 
                      private readonly router: Router, 
                      private readonly toastr: ToastrService, 
                      private readonly transactionsService: TransactionsService
  ) { }
  
  public load() {
    this.incomeComponent.load();
    const month = this.months.indexOf(this.monthSelected);
    this.transactionsService.findAll(this.treasuryId, this.typeTransactionSelected, this.yearSelected, month).subscribe( response => {
      this.rows = [...response.body.recipes, ...response.body.expenses];
      this.loading = false;
    }, err => {
      this.errorMessage(err);
    });
  }

  private errorMessage(err: any) {
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
      this.router.navigateByUrl('/home');
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
    this.resetFormRecipes();
    modal.show();
  }

  public hideModalUpdateExpense(modal: any) {
    this.resetFormExpenses();
    modal.hide();
  }

  public resetFormRecipes() {
    this.formRecipes.patchValue({
        id: null,
        description: '',
        value: '',
        offerer: null,
        registeredIn: moment().format('DDMMYYYY'),
        details: null
    })
    this.credits = [];
  }

  public resetFormExpenses() {
    this.formExpenses.patchValue({
      id: null,
      description: '',
      value: '',
      registeredIn: moment().format('DDMMYYYY'),
      details: null,
    });
  }

  public saveOrUpdateRecipe(recipe: Recipe, modal: any) {
    let newRecipe = new Recipe({
      id: recipe.id,
      description: recipe.description,
      value: recipe.value,
      offerer: recipe.offerer,
      type: TransactionType.RECIPE,
      details: recipe.details,
      registeredIn: moment(recipe.registeredIn, 'DDMMYYYY', true).toDate(),
      credits: this.credits
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

  public addCredit(form: any, modal: any){
    modal.hide();
    let credit = form.value;
    this.credits.push(new Credit({
      holder: credit.holder,
      value: credit.value,
      telephone: credit.telephone,
      status: StatusType.ACTIVE
    }));
    form.reset();
  }

  public removeCredit(index: number, credit: Credit) {
    this.credits.splice(index, 1);
  }

  public payOffCredit(credit: Credit) {
    if(credit.status  != StatusType.FINISHED) {
      credit.status = credit.status === StatusType.ACTIVE ? StatusType.SETTLED : StatusType.ACTIVE;
    }
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
        offerer: row.offerer,
        registeredIn: moment(row.registeredIn).format('DDMMYYYY'),
        details: row.details,
      });
      this.credits = row.credits;
      modalUpdateRecipe.show();
    }
  }

  ngOnInit() {
    this.treasuryId = parseInt(this.router.url.split('/')[2]);
    this.load();
    this.formRecipes = this._fb.group({
      id: [null],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      value :[Validators.required],
      offerer: [null, [Validators.minLength(2), Validators.maxLength(60)]],
      type: [TransactionType.RECIPE],
      registeredIn: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
      details: [null, Validators.maxLength(255)],
    });

    this.formExpenses = this._fb.group({
      id: [null],
      description:['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      value:['', Validators.required],
      type: [TransactionType.EXPENSE],
      registeredIn: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
      details: [null, Validators.maxLength(255)]
    });

    this.formCredits = this._fb.group({
      id: [null],
      holder: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      value: ['', Validators.required],
      registeredIn: [''],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      status: ['']
    });
  }
}