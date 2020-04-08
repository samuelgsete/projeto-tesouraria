import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result = '';
    let [ano, mes, dia] = value.split('-');

    dia = dia.split('T')[0];
    
    result = `${dia}/${mes}/${ano}`;
    return result;
  }
}
