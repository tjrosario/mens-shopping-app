import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeGeneric'})
export class RemoveGenericPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    return value.replace('Generic', '').replace(/s$/i, '');
  }
}
