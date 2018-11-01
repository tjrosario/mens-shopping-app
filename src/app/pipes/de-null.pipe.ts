import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'deNull'})
export class DeNullPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    return value || '';
  }
}
