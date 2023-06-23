import { OnDestroy, AfterViewInit } from '@angular/core';
import { ElementRef, Component, Input, HostListener } from '@angular/core';
import { Quantity } from './quantity';
import { Unit } from './unit';
import { SystemOfUnits } from './system-of-units.service';
import { Subscription } from 'rxjs';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ngUnitSelect]',
    template: `<option *ngFor="let u of quantity?.units">{{u.symbol}}</option>`,
})
export class UnitSelectComponent implements OnDestroy, AfterViewInit {

    // tslint:disable-next-line:no-input-rename
    @Input('ngUnitSelect') set quantityAttr(value: string | Quantity) {

        this.initQuantity(value);
        setTimeout(() => this.selectUnit(), 0);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.system.changes$.subscribe((msg) => {
            if (msg.quantity === this.quantity) {
                this.selectUnit();
            }
        });
    }

    quantity: Quantity;

    private currentUnit: Unit;
    private select: HTMLSelectElement;
    private subscription: Subscription;

    constructor(elementRef: ElementRef, private system: SystemOfUnits) {
        this.select = elementRef.nativeElement;
    }

    ngAfterViewInit(): void {
        this.selectUnit();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private initQuantity(quantity: string | Quantity) {
        this.quantity = typeof quantity === 'string' ? this.system.get(quantity) : quantity;
    }

    private selectUnit() {
        const quantity = this.quantity;
        this.currentUnit = quantity ? quantity.unit : null;
        this.select.selectedIndex = quantity ? quantity.units.indexOf(this.currentUnit) : -1;
    }

    @HostListener('change', ['$event'])
    change() {
        const index = this.select.selectedIndex;
        this.currentUnit = this.quantity.units[index];
        this.system.selectUnit(this.quantity, this.currentUnit);
    }
}

