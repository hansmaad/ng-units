import { Pipe, PipeTransform } from '@angular/core';
import { QuantityFormatters } from './formatters';
import { QuantityParsers } from './parsers';
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
        if (value === null || value === undefined) {
            return quantity && addSymbol ? quantity.unit.symbol : '';
        }
        return quantity ? quantity.print(quantity.fromBase(value), addSymbol) : print(value);
    }
}


function print(value: string|number) {
    const num = QuantityParsers['default'](value);
    return QuantityFormatters['default'](num);
}
