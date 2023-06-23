import { OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class UnitSelectComponent implements OnChanges, OnDestroy, AfterViewInit {

    // tslint:disable-next-line:no-input-rename
    @Input('ngUnitSelect') quantityAttr: string | Quantity;

    quantity: Quantity;

    private currentUnit: Unit;
    private select: HTMLSelectElement;
    private subscription: Subscription;

    constructor(elementRef: ElementRef, private system: SystemOfUnits) {
        this.select = elementRef.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['quantityAttr']) {
            this.initQuantity();
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.system.changes$.subscribe((msg) => {
                if (msg.quantity === this.quantity) {
                    this.selectUnit();
                }
            });
        }
    }

    ngAfterViewInit(): void {
        this.selectUnit();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private initQuantity() {
        this.quantity = typeof this.quantityAttr === 'string' ?
            this.system.get(this.quantityAttr) : this.quantityAttr;
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

