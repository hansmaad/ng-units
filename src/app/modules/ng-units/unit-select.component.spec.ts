import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSelectComponent } from './unit-select.component';
import { length } from './quantities';
import { FormsModule } from '@angular/forms';
import { SystemOfUnits } from './system-of-units.service';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Quantity } from './quantity';


@Component({
  template: `
  <select ngUnitSelect="Length"></select>`
})
class UnitSelectTestComponent { 
}

describe('UnitSelectComponent', () => {
  
  let fixture: ComponentFixture<UnitSelectTestComponent>;
  let select: DebugElement;
  let systemOfUnits: SystemOfUnits;
  let quantity: Quantity;

  beforeEach(async(() => {
    systemOfUnits = new SystemOfUnits();
  }));

  function create() {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ UnitSelectComponent, UnitSelectTestComponent ],
      providers: [{
        provide: SystemOfUnits,
        useValue: systemOfUnits
    }]
    })
    .createComponent(UnitSelectTestComponent);
    fixture.detectChanges();
    select = fixture.debugElement.query(By.css('select'));
  }

  describe('with Length instance', () => {
    beforeEach(() => {
      quantity = new Quantity(length);
      systemOfUnits.add(quantity);
      systemOfUnits.selectUnit(quantity, 'cm');
      create();
    });

    it('should create', () => {
      expect(select.nativeElement.tagName).toBe('SELECT');
    });

    it('should add units', () => {
      let options = [].slice.call(select.nativeElement.options);
      expect(options.length).toBe(quantity.units.length);
    });

    it('should show selected unit', () => {
      let options = select.nativeElement.options;
      expect(options[select.nativeElement.selectedIndex].text).toBe('cm');
    });

    it('should select unit', () => {
      select.nativeElement.selectedIndex = 0;
      select.triggerEventHandler('change', {});
      fixture.detectChanges();
      expect(quantity.unit.symbol).toBe('m');
    });

    it('should update selected unit', () => {
      systemOfUnits.selectUnit(quantity, 'mm');
      fixture.detectChanges();
      let options = select.nativeElement.options;
      expect(options[select.nativeElement.selectedIndex].text).toBe('mm');
    });
  });

  describe('with unknown quanity', () => {
    beforeEach(() => {
      create();
    })

    it('should init to empty', () => {
      expect(select.nativeElement.options.length).toBe(0);
    });
  })

  
});
