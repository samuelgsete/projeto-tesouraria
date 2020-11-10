import { Pipe, PipeTransform } from '@angular/core';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril', 
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro', 
  'Novembro',
  'Dezembro'
];

@Pipe({
  name: 'dateShow'
})
export class DateShowPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let result = ``;
    if(typeof value == 'string') {
      const date = value.split('/');
      const day = date[0]
      const month = parseInt(date[1]);
      const year = date[2];
      result = `${day} de ${months[month-1]} de ${year}`;
    }
    return result;
  }
}