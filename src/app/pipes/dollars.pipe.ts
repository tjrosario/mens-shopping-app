import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dollars'})
export class DollarsPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    return '$' + parseInt(value, 10) / 100;
  }
}
