import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Inventory } from 'src/app/shared/models/inventory.entity';
import { Treasury } from 'src/app/shared/models/treasury.entity';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreasuryService } from 'src/app/shared/services/treasury.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { DateValidator } from 'src/app/shared/validators/date.validator';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public f: FormGroup;

  public rows: Inventory[] = [];
  public treasury: Treasury = new Treasury();

  public loading = true;
  public inventoriesSelected: any = [];
  public dateValidator = new DateValidator();

  constructor(
              private router: Router, 
              private _fb: FormBuilder, 
              private toastr: ToastrService,
              private service: TreasuryService
            ) 
  {
    this.load();
  }

  public whenSelecting(rows: any) { this.inventoriesSelected = rows.selected }

  public load() {
    let id = parseInt(this.router.url.split('/')[2]);
    this.service.findById(id).subscribe( res => {
      this.treasury = res;
      this.rows = this.treasury.inventories;
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
      registeredIn: moment(inventory.registeredIn, 'DDMMYYYY', true).toDate()
    });

    if(newInventory.id == null) {
      this.treasury.inventories.push(newInventory);
      this.service.update(this.treasury).subscribe( res => {
        this.toastr.success('Cadastrado com sucesso', 'Tudo ok!', { progressBar: true });
        this.load();
      }, e => {
        this.errorMessage(e);
      });
    }
    else {
      let i = 0;
      this.treasury.inventories.forEach((item, index) => {
        if(item.id === newInventory.id) {
          i = index;
        }
      });
      this.treasury.inventories[i] = newInventory;
      this.service.update(this.treasury).subscribe( res => {
        this.toastr.success('Atalizado com sucesso', 'Tudo ok!', { progressBar: true });
        this.load();
      }, e => {
        this.errorMessage(e);
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
        let index = 0;
        this.inventoriesSelected.forEach(item => {
          index = this.treasury.inventories.indexOf(item);
          if (index >= 0) {
            this.treasury.inventories.splice(index,1);
          } 
          this.service.update(this.treasury).subscribe(res => {
            this.load();
            this.toastr.success('Removido com sucesso', 'Tudo ok!', { progressBar: true });
          }, e => {
            this.errorMessage(e);
          }); 
        });
        this.inventoriesSelected = [];
      } 
    });
  }

  public deleteInventory(inventory: any) {
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
        index = this.treasury.inventories.indexOf(inventory);
        if(index >=0) {
          this.treasury.inventories.splice(index, 1);
        }
        this.service.update(this.treasury).subscribe( res => {
          this.toastr.success('Removido com sucesso', 'Tudo ok!', { progressBar: true });
          this.load();
        }, e => {
          this.errorMessage(e);
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
      actualBalance: [0, Validators.required],
      registeredIn: [moment().format('DDMMYYYY'), [Validators.required, this.dateValidator.validate()]],
    });
  }
}