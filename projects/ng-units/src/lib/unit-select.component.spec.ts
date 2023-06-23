import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSelectComponent } from './unit-select.component';
import { length, pressure } from './quantities';
import { FormsModule } from '@angular/forms';
import { SystemOfUnits } from './system-of-units.service';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Quantity } from './quantity';


@Component({
    template: `
  <select [ngUnitSelect]="quantity"></select>`
})
class UnitSelectTestComponent {
    quantity = 'Length';
}

describe('UnitSelectComponent', () => {

    let fixture: ComponentFixture<UnitSelectTestComponent>;
    let component: UnitSelectTestComponent;
    let select: DebugElement;
    let systemOfUnits: SystemOfUnits;
    let quantity: Quantity;
    let otherQuantity: Quantity;

    beforeEach(async(() => {
        systemOfUnits = new SystemOfUnits();
    }));

    function create() {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [UnitSelectComponent, UnitSelectTestComponent],
            providers: [{
                provide: SystemOfUnits,
                useValue: systemOfUnits
            }]
        })
            .createComponent(UnitSelectTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        select = fixture.debugElement.query(By.css('select'));
    }

    describe('with Length instance', () => {
        beforeEach(() => {
            quantity = new Quantity(length);
            otherQuantity = new Quantity(pressure);
            systemOfUnits.add(quantity);
            systemOfUnits.add(otherQuantity);
            systemOfUnits.selectUnit(quantity, 'cm');
            create();
        });

        it('should create', () => {
            expect(select.nativeElement.tagName).toBe('SELECT');
        });

        it('should add units', () => {
            const options = [].slice.call(select.nativeElement.options);
            expect(options.map(x => x.innerHTML)).toEqual(quantity.units.map(u => u.symbol));
        });

        it('should show selected unit', () => {
            const options = select.nativeElement.options;
            expect(options[select.nativeElement.selectedIndex].text).toBe('cm');
        });

        it('should select unit', () => {
            selectUnitByIndex(0);
            expect(quantity.unit.symbol).toBe('m');
        });

        it('should update selected unit', () => {
            systemOfUnits.selectUnit(quantity, 'mm');
            fixture.detectChanges();
            const options = select.nativeElement.options;
            expect(options[select.nativeElement.selectedIndex].text).toBe('mm');
        });

        it('should update quantity', () => {
            component.quantity = otherQuantity.name;
            fixture.detectChanges();
            const options = [].slice.call(select.nativeElement.options);
            expect(options.map(x => x.innerHTML)).toEqual(otherQuantity.units.map(u => u.symbol));
        });

        it('should update unit when quantity changed', async () => {
            selectUnitByIndex(0);
            otherQuantity.selectUnit('mbar');
            component.quantity = otherQuantity.name;
            fixture.detectChanges();
            await fixture.whenStable();
            const options = select.nativeElement.options;
            expect(options[select.nativeElement.selectedIndex].text).toBe('mbar');
        });

        const selectUnitByIndex = (index: number) => {
            select.nativeElement.selectedIndex = index;
            select.triggerEventHandler('change', {});
            fixture.detectChanges();
        }
    });

    describe('with unknown quanity', () => {
        beforeEach(() => {
            create();
        });

        it('should init to empty', () => {
            expect(select.nativeElement.options.length).toBe(0);
        });
    });


});
