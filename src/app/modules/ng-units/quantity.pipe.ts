import { Pipe, PipeTransform } from '@angular/core';
import { Quantity } from './quantity';
import { QuantityService } from './quantity.service';

@Pipe({
    name: 'ngQuantity',
    pure: false
})
export class QuantityPipe implements PipeTransform {

    constructor(service: QuantityService) {
    }

    transform(value: string | number, quantity?: Quantity, addSymbol?: boolean): any {
        return quantity ? quantity.print(quantity.fromBase(value), addSymbol) : value;
    }

}
