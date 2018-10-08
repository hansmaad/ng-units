import { Injectable } from '@angular/core';
import { Quantity } from './quantity';
import { Unit } from './unit';
import { Subscription, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';


export class QuantityMessage {
    quantity: Quantity;
}

@Injectable()
export class SystemOfUnits {

    quantities: Quantity[] = [];

    private quantityChange = new Subject<QuantityMessage>();

    constructor() {
    }

    add(...quantities: Quantity[]) {
        this.quantities.push(...quantities);
    }

    get(quantityName: string): Quantity {
        let quantity = this.quantities.find(q => q.name === quantityName);
        return quantity;
    }

    selectUnit(quantity: Quantity, unit: string|Unit) {
        quantity.selectUnit(unit);
        this.broadcast(quantity);
    }

    subscribe(quantity, callback: (m: QuantityMessage) => any): Subscription {
        return this.quantityChange.pipe(
            filter(m => m.quantity === quantity))
            .subscribe(callback);
    }

    broadcast(quantity: Quantity) {
        this.quantityChange.next({ quantity });
    }

}
