import { Directive, ElementRef, Renderer2, OnInit, Component, Input, forwardRef, HostListener } from '@angular/core';
import { Quantity } from './quantity';
import { Unit } from './unit';
import { SystemOfUnits } from './system-of-units.service';

@Component({
  selector: '[ngUnitSelect]',
  template: `<option *ngFor="let u of quantity?.units">{{u.symbol}}</option>`,
})
export class UnitSelectComponent implements OnInit {

  @Input('ngUnitSelect')
  quantityAttr: string | Quantity;

  quantity: Quantity;

  private currentUnit: Unit;
  private select: HTMLSelectElement;

  constructor(elementRef: ElementRef, private system: SystemOfUnits) {
    this.select = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.initQuantity();
    this.currentUnit = this.quantity ? this.quantity.unit: null;
  }

  private initQuantity() {
      this.quantity = typeof this.quantityAttr === 'string' ? 
          this.system.get(this.quantityAttr) : this.quantityAttr;
  }

  @HostListener('change', ['$event'])
  change(event: Event) {
    let index = this.select.selectedIndex;
    this.currentUnit = this.quantity.units[index]
    this.quantity.selectUnit(this.currentUnit);
  }

  ngDoCheck(): void {
      let newUnit = this.quantity ? this.quantity.unit : null;
      if (newUnit !== this.currentUnit) {
        this.select.selectedIndex = this.quantity.units.indexOf(newUnit);
        this.currentUnit = newUnit;
      }
  }
}

