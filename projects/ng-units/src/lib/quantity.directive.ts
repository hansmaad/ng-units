import {
    OnInit,
    OnChanges,
    SimpleChanges,
    OnDestroy
} from '@angular/core';
import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { defaultPrint, Quantity } from './quantity';
import { SystemOfUnits } from './system-of-units.service';
import { Subscription } from 'rxjs';
import { Unit } from './unit';


const CONTROL_VALUE_ACCESSOR = {
    name: 'ngQuantityValueAccessor',
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuantityDirective),
    multi: true
};

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[ngQuantity]',
    providers: [
        CONTROL_VALUE_ACCESSOR
    ]
})
export class QuantityDirective implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {

    /** @deprecated since 11.0.0 */
    @Input() formControlName: string;

    @Input('ngQuantity') quantityAttr: string | Quantity;
    @Input() ngUnit?: string|Unit;

    quantity: Quantity;

    private inputElement: HTMLInputElement;
    private onTouch: Function;
    private onModelChange: Function;
    private currentModelValue;
    private subscription: Subscription;

    constructor(private elementRef: ElementRef, private system: SystemOfUnits) {

    }

    ngOnInit(): void {
        this.inputElement = this.getInputElement();
        this.initQuantity();
    }

    private initQuantity() {
        this.unsubscribe();
        this.quantity = typeof this.quantityAttr === 'string' ?
            this.system.get(this.quantityAttr) : this.quantityAttr;
        this.subscribe();
        this.updateUnit();
    }

    private subscribe() {
        if (this.quantity) {
            this.subscription = this.system.changes$.subscribe(m => {
                if (m.quantity === this.quantity) {
                    this.updateUnit();
                }
            });
        }
    }

    private updateUnit() {
        this.updateView(this.currentModelValue);
    }

    private unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['quantityAttr'];
        if (change && !change.isFirstChange()) {
            this.initQuantity();
        }
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    // Parser: View to Model
    @HostListener('input', ['$event'])
    onControlInput($event: KeyboardEvent) {

        const rawValue: any = this.inputElement.value;
        const modelValue = this.quantity ? this.quantity.toBase(rawValue, this.ngUnit) : rawValue;
        this.currentModelValue = modelValue;

        if (this.onTouch) {
            this.onTouch();
        }

        if (this.onModelChange) {
            this.onModelChange(modelValue);
        }
    }


    // Formatter: Model to View
    writeValue(rawValue: any): void {
        this.currentModelValue = rawValue;
        this.updateView(rawValue);
    }

    private updateView(modelValue: any) {
        if (!this.quantity) {
            this.inputElement.value = defaultPrint(modelValue);
            return;
        }
        const converted = this.quantity.fromBase(modelValue, this.ngUnit);
        if (converted !== null && converted !== undefined) {
            this.inputElement.value = this.quantity.print(converted, false);
        }
        else {
            this.inputElement.value = null;
        }
    }

    private getInputElement(): HTMLInputElement {
        let input: HTMLInputElement;
        const element = this.elementRef.nativeElement;
        if (element.tagName === 'INPUT') {
            input = element;
        }
        else {
            input = element.querySelector('input');
        }

        if (!input) {
            throw new Error('ngQuantity only allowed on inputs or elements containing inputs.');
        }
        return input;
    }

}
