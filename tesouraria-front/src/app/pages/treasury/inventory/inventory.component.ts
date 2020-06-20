import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { Inventory } from 'src/app/shared/models/inventory.entity';
import { DateValidator } from 'src/app/shared/validators/date.validator';
import { InventoryService } from 'src/app/shared/services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public f: FormGroup;

  public rows: Inventory[] = [];
  public treasuryId: number = 0;

  public loading = true;
  public inventoriesSelected: any = [];
  public dateValidator = new DateValidator();

  constructor(
                private readonly router: Router, 
                private readonly _fb: FormBuilder, 
                private readonly toastr: ToastrService,
                private readonly service: InventoryService
            ) 
  {
    this.treasuryId = parseInt(this.router.url.split('/')[2]);
    this.load();
  }

  public whenSelecting(rows: any) { this.inventoriesSelected = rows.selected }

  public load() {
    this.service.findAll(this.treasuryId).subscribe( response => {
      this.rows = response;
      this.loading = false;
    }, e => {
      this.errorMessage(e);
    })
  }

  public errorMessage(err: any) {
    if(err.status == 0) {
      this.toastr.error('Servidor Inacessível', 'ERRO', { progressBar: true });
    }

    else if(err.status == 401) {
      this.router.navigateByUrl('/login');
      this.toastr.info('Necessário autenticação', 'Sessão expirada', { progressBar: true });
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
    }

    else {
      this.toastr.error(err.error.details, 'ERRO', { progressBar: true });
      this.router.navigateByUrl('/home');
    }
  }

  public saveOrUpdateInventory(inventory: Inventory, modal: any) {
    const newInventory = new Inventory({
      id: inventory.id,
      actualBalance: inventory.actualBalance,
      currentBalance: inventory.currentBalance,
      discrepancy: inventory.actualBalance - inventory.currentBalance,
      registeredIn: moment(inventory.registeredIn, 'DDMMYYYY', true).toDate()
    });

    if(!newInventory.id) {
      this.service.save(newInventory, this.treasuryId).subscribe( res => {
        this.toastr.success('Cadastrado com sucesso', 'Tudo ok!', { progressBar: true });
        this.load();
      }, err => {
        this.errorMessage(err);
      });
    }
    else {
      this.service.update(newInventory, this.treasuryId).subscribe( res => {
        this.toastr.success('Atalizado com sucesso', 'Tudo ok!', { progressBar: true });
        this.load();
      }, err => {
        this.errorMessage(err);
      });
    }
    modal.hide();
  }

  public deleteInventoriesSelected() {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.inventoriesSelected.forEach(inventory => {
          this.service.delete(inventory.id, this.treasuryId).subscribe(res => {
            this.load();
            this.toastr.success('Removido com sucesso', 'Tudo ok!', { progressBar: true });
          }, err => {
            this.errorMessage(err);
          }); 
        });
        this.inventoriesSelected = [];
      } 
    });
  }

  public deleteInventory(inventory: any) {
    Swal.fire({
      title: 'Tem certeza que deseja remover?',
      text: 'Você não poderá desfazer essa operação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.service.delete(inventory.id, this.treasuryId).subscribe( res => {
          this.toastr.success('Removido com sucesso', 'Tudo ok!', { progressBar: true });
          this.load();
        }, err => {
          this.errorMessage(err);
        });
        this.inventoriesSelected = [];
      } 
    });
  }

  public showModalUpdate(row: any, modal: any) {
    modal.show();
    this.f.patchValue({
      id: row.id,
      actualBalance: row.actualBalance,
      currentBalance: row.currentBalance,
      discrepancy: row.discrepancy,
      registeredIn: moment(row.registeredIn).format('DDMMYYYY')
    });
  }

  public showModalCreate(modal: any) {
    this.f.reset();
    this.f.patchValue({
      registeredIn: moment().format('DDMMYYYY'),
    });
    modal.show();
  }

  ngOnInit() {
    this.f = this._fb.group({
      id: [null],
      actualBalance: ['', Validators.required],
      currentBalance: ['', Validators.required],
      discrepancy: [0],
      registeredIn: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
    });
  }
}