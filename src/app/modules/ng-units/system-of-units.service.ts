import { Injectable } from '@angular/core';
import { Quantity } from './quantity';
import { Unit } from './unit';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';


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
        return this.quantityChange
            .filter(m => m.quantity === quantity)
            .subscribe(callback);
    }

    broadcast(quantity: Quantity) {
        this.quantityChange.next({ quantity });
    }

}
