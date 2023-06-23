import { Pipe, PipeTransform } from '@angular/core';
import { defaultPrint, Quantity } from './quantity';
import { SystemOfUnits } from './system-of-units.service';
import { Unit } from './unit';

@Pipe({
    name: 'ngQuantity',
    pure: false
})
export class QuantityPipe implements PipeTransform {

    constructor(private system: SystemOfUnits) {
    }

    transform(value: string | number,
        quantity?: Quantity | string,
        addSymbolOrUnit?: boolean|Unit|string,
        addSymbol?: boolean): string
    {
        if (typeof quantity === 'string') {
            quantity = this.system.get(quantity);
        }

        let unit: string|Unit;
        if (typeof addSymbolOrUnit === 'boolean') {
            addSymbol = addSymbolOrUnit;
        }
        else {
            unit = addSymbolOrUnit;
        }

        if (value === null || value === undefined) {
            if (!quantity || !addSymbol) {
                return '';
            }
            if (unit) {
                return quantity.findUnit(unit)?.symbol;
            }
            return quantity.unit.symbol;
        }
        return quantity ? quantity.print(quantity.fromBase(value, unit), addSymbol, unit) : defaultPrint(value);
    }
}

