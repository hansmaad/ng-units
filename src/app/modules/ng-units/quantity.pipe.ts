import { Pipe, PipeTransform } from '@angular/core';
import { Quantity } from './quantity';

@Pipe({
  name: 'ngQuantity'
})
export class QuantityPipe implements PipeTransform {

  transform(value: string|number, quantity: Quantity, addSymbol?: boolean): any {
    value = quantity ? quantity.fromBase(value) : value;
    return addSymbol ? value + ' ' + quantity.unit.symbol : value;
  }

}
