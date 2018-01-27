import { Injectable } from '@angular/core';
import { Quantity } from './quantity';

@Injectable()
export class SystemOfUnits {

    quantities: Quantity[] = [];

    constructor() {
        console.log('ctor')
    }

    add(...quantities: Quantity[]) {
        this.quantities.push(...quantities);
    }

    get(quantityName: string): Quantity {
        let quantity = this.quantities.find(q => q.name === quantityName);
        return quantity;
    }

}
