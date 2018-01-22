import { Pipe, PipeTransform } from '@angular/core';
import { Quantity } from './quantity';

@Pipe({
  name: 'ngQuantity',
  pure: false
})
export class QuantityPipe implements PipeTransform {

  transform(value: string|number, quantity?: Quantity, addSymbol?: boolean): any {
    return quantity ? quantity.print(quantity.fromBase(value), addSymbol) : value;
  }

}
