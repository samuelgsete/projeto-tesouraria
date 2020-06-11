import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import * as moment from "moment";

import { Treasury } from 'src/app/shared/models/treasury.entity';
import { Credit } from 'src/app/shared/models/credit.entity';
import { Expense } from 'src/app/shared/models/expense.entity';
import { Recipe } from 'src/app/shared/models/recipe.entity';
import { TreasuryService } from 'src/app/shared/services/treasury.service';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { StatusType } from 'src/app/shared/models/enums/status-type.enum';
import { TransactionType } from 'src/app/shared/models/enums/transaction-type.enum';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public formRecipes: FormGroup;
  public formExpenses: FormGroup;
  public formCredits: FormGroup;

  public treasury: Treasury = new Treasury();
  public credits: Credit[] = [];

  public rows: any[] = [];
  public loading = true;
  public transactionsSelected: any = [];
  public dateValidator = new DateValidator();
  public transactionType = TransactionType;

  public yearSelected = 2020;
  public monthSelected = 'Todos os meses';
  public typeSelected = 'RECEITA E DESPESA';

  public years = [ 2019, 2020, 2021 ];
  public months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro','Todos os meses'
  ];
  public types = ['RECEITA', 'DESPESA', 'RECEITA E DESPESA']
  
  public constructor(
                private _fb: FormBuilder, 
                private router: Router, 
                private toastr: ToastrService, 
                private servico: TreasuryService
  ) { }
  
  public load() {
    console.log('oi');
    const id = parseInt(this.router.url.split('/')[2]);
    const month = this.months.indexOf(this.monthSelected);

    this.servico.findByIdWithFilter(id, this.typeSelected, this.yearSelected, month).subscribe( resp => {
      this.treasury =  resp.body;
      this.rows = [...this.treasury.recipes, ...this.treasury.expenses];  
      this.loading = false;
    }, 
    erro => {
      this.errorMessage(erro);
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
    
    if(newRecipe.id == null) {
      this.treasury.recipes.push(newRecipe);
      this.servico.update(this.treasury).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load(); 
      }
      , erro => {
        let index = this.treasury.recipes.indexOf(newRecipe);
        this.treasury.recipes.splice(index,1);
        this.errorMessage(erro);
      });
    }
    else {
      let currentRecipe = this.treasury.recipes.filter( recipe => {
        return recipe.id == recipe.id;
      })[0];

      let indice = this.treasury.recipes.indexOf(currentRecipe);
      this.treasury.recipes[indice] = newRecipe;

      this.servico.update(this.treasury).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }
      , erro => {
        let index = this.treasury.recipes.indexOf(newRecipe);
        this.treasury.recipes.splice(index,1);
        this.errorMessage(erro);
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

    if(newExpense.id == null) {
      this.treasury.expenses.push(newExpense);
      this.servico.update(this.treasury).subscribe(res => {
        this.toastr.success('Criado com sucesso', 'Feito', { progressBar: true });  
        this.load();  
      }
      , 
      erro => {
        let index = this.treasury.expenses.indexOf(newExpense);
        this.treasury.expenses.splice(index,1);
        this.errorMessage(erro);
      });
    }
    else {
      let currentExpense = this.treasury.expenses.filter( expense => {
        return expense.id == newExpense.id;
      })[0];

      let index = this.treasury.expenses.indexOf(currentExpense);
      this.treasury.expenses[index] = newExpense;

      this.servico.update(this.treasury).subscribe(res => {
        this.load();
        this.toastr.success('Atualizado com sucesso', 'Feito', { progressBar: true });
      }
      , erro => {
        let index = this.treasury.expenses.indexOf(newExpense);
        this.treasury.expenses.splice(index,1);
        this.errorMessage(erro);
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
        let index = 0;
        this.transactionsSelected.forEach(item => {
          index = this.treasury.recipes.indexOf(item);
          if (index >= 0) {
            this.treasury.recipes.splice(index,1);
          } 
          index = this.treasury.recipes.indexOf(item);
          if (index >= 0) {
            this.treasury.recipes.splice(index,1);
          }
          this.servico.update(this.treasury).subscribe(res => {
            this.load();
            this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
          }
          , erro => {
            this.errorMessage(erro);
          }); 
        });
        this.transactionsSelected = [];
      } 
    });
  }

  public deleteTransaction(transaction: any) {
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
        index = this.treasury.recipes.indexOf(transaction);
        if(index >=0) {
          this.treasury.recipes.splice(index, 1);
        }
        index = this.treasury.expenses.indexOf(transaction);
        if(index >=0) {
          this.treasury.expenses.splice(index, 1);
        }
        this.servico.update(this.treasury).subscribe(res => {
          this.load();
          this.toastr.success('Removido com sucesso', 'Feito', { progressBar: true });
        }
        , erro => {
          this.errorMessage(erro);
        });
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