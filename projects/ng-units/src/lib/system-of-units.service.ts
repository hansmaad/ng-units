import { Injectable } from '@angular/core';
import { Quantity } from './quantity';
import { Unit } from './unit';
import { Subscription, Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


export class QuantityMessage {
    quantity: Quantity;
}

@Injectable()
export class SystemOfUnits {

    quantities: Quantity[] = [];

    private readonly quantityChange = new Subject<QuantityMessage>();
    public readonly changes$ = this.quantityChange.asObservable();


    add(...quantities: Quantity[]) {
        this.quantities.push(...quantities);
    }

    get(quantityName: string): Quantity {
        const quantity = this.quantities.find(q => q.name === quantityName);
        return quantity;
    }

    selectUnit(quantity: Quantity, unit: string|Unit) {
        quantity.selectUnit(unit);
        this.broadcast(quantity);
    }

    /**
     * @depracted since 11.0.0. Use changes$ instead.
     */
    changes(): Observable<QuantityMessage> {
        return this.changes$;
    }

    /**
     * @depracted since 11.0.0. Use changes$ instead.
     */
    subscribe(quantity, callback: (m: QuantityMessage) => unknown): Subscription {
        return this.quantityChange.pipe(
            filter(m => m.quantity === quantity))
            .subscribe(callback);
    }

    broadcast(quantity: Quantity) {
        this.quantityChange.next({ quantity });
    }

}
