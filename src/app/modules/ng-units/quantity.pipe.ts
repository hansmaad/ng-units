import { Pipe, PipeTransform } from '@angular/core';
import { Quantity } from './quantity';

@Pipe({
  name: 'ngQuantity'
})
export class QuantityPipe implements PipeTransform {

  transform(value: string|number, quantity: Quantity): any {
    return quantity ? quantity.fromBase(value) : value;
  }

}
