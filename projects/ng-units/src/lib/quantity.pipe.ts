import { Pipe, PipeTransform } from '@angular/core';
import { Quantity } from './quantity';
import { SystemOfUnits } from './system-of-units.service';

@Pipe({
    name: 'ngQuantity',
    pure: false
})
export class QuantityPipe implements PipeTransform {

    constructor(private system: SystemOfUnits) {
    }

    transform(value: string | number,
        quantity?: Quantity | string,
        addSymbol?: boolean): any
    {
        if (typeof quantity === 'string') {
            quantity = this.system.get(quantity);
        }
        return quantity ? quantity.print(quantity.fromBase(value), addSymbol) : value;
    }

}
