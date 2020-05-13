import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PaginationService {

  public emitirTamanho = new EventEmitter<any>();

  public constructor() { 
    this.emitirTamanho.emit()
  }

  public loader(size: number, pageCurrent: number) {
    this.emitirTamanho.emit({ size, pageCurrent });
  }
}