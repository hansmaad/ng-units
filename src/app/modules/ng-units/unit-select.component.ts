import { Directive, ElementRef, Renderer2, OnInit, Component, Input, forwardRef, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { Quantity } from './quantity';
import { Unit } from './unit';
import { SystemOfUnits } from './system-of-units.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: '[ngUnitSelect]',
    template: `<option *ngFor="let u of quantity?.units">{{u.symbol}}</option>`,
})
export class UnitSelectComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input('ngUnitSelect')
    quantityAttr: string | Quantity;

    quantity: Quantity;

    private currentUnit: Unit;
    private select: HTMLSelectElement;
    private subscription: Subscription;

    constructor(elementRef: ElementRef, private system: SystemOfUnits) {
        this.select = elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.initQuantity();
        this.subscription = this.system.subscribe(this.quantity, (msg) => {
            this.selectUnit();
        })
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
        let quantity = this.quantity;
        this.currentUnit = quantity ? quantity.unit : null;
        this.select.selectedIndex = quantity ? quantity.units.indexOf(this.currentUnit): -1;
    }

    @HostListener('change', ['$event'])
    change(event: Event) {
        let index = this.select.selectedIndex;
        this.currentUnit = this.quantity.units[index]
        this.system.selectUnit(this.quantity, this.currentUnit);
    }
}

