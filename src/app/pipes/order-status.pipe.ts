import { Pipe, PipeTransform } from '@angular/core';

const map = {
	'finalized': 'initiated'
};

@Pipe({name: 'orderStatus'})
export class OrderStatusPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    return map[value] || value;
  }
}
