import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  DoCheck
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuantityService } from "./quantity.service";
import { Quantity } from "./quantity";


const CONTROL_VALUE_ACCESSOR = {
  name: 'ngQuantityValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QuantityDirective),
  multi: true
};

@Directive({
  selector: '[ngQuantity]',
  providers: [
      CONTROL_VALUE_ACCESSOR
  ]
})
export class QuantityDirective implements ControlValueAccessor, OnInit, DoCheck {

  @Input()
  formControlName: string;

  @Input('ngQuantity')
  quantityAttr: string | Quantity;

  quantity: Quantity;

  private inputElement: HTMLInputElement;
  private onTouch: Function;
  private onModelChange: Function;
  private currentUnit: string;
  private currentModelValue;

  constructor(private elementRef: ElementRef, private service: QuantityService) {

  }

  ngOnInit(): void {
      this.inputElement = this.getInputElement();
      // this.quantity = typeof this.quantityAttr === 'string' ? 
      //     this.service.getQuantity(this.quantityAttr) : this.quantityAttr;

      this.quantity = this.quantityAttr as Quantity;
      if (!this.quantity) {
          throw new Error('Invalid quantity.');
      }
  }

  ngDoCheck(): void {
      let newUnit = this.quantity.unit.symbol;
      if (newUnit !== this.currentUnit) {
          this.updateView(this.currentModelValue);
          this.currentUnit = newUnit;
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
      const modelValue = this.quantity.toBase(rawValue);
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
      let converted = this.quantity.fromBase(modelValue);
      if (converted !== null && converted !== undefined) {
          this.inputElement.value = this.quantity.print(converted, false);
      }
      else {
          this.inputElement.value = null;
      }
  }

  private getInputElement(): HTMLInputElement {
      let input: HTMLInputElement;
      let element = this.elementRef.nativeElement;
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