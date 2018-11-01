import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'makePositive'})
export class MakePositivePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    return Math.abs(+value);
  }
}
