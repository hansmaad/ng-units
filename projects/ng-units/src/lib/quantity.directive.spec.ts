import { QuantityDirective } from './quantity.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemOfUnits } from './system-of-units.service';
import { FormsModule } from '@angular/forms';
import { Quantity } from './quantity';
import { length } from './quantities/length';
import { By } from '@angular/platform-browser';
import { area } from './quantities';
import { Unit } from './unit';


@Component({
    template: `
    <div>
    <input id="by-instance" type="number" [(ngModel)]="value" [ngQuantity]="quantity" >
    <input id="by-name" type="number" [(ngModel)]="value" ngQuantity="Length" >
    <input id="with-unit-name" type="number" [(ngModel)]="value" ngQuantity="Length" ngUnit="mm" >
    <input id="with-unit-binding" type="number" [(ngModel)]="value" ngQuantity="Length" [ngUnit]="unit" >
    </div>
    `
})
class QuantityDirectiveTestComponent {
    value = 1;
    quantity: Quantity;
    unit: string|Unit = '';
}

describe('QuantityDirective', () => {

    let fixture: ComponentFixture<QuantityDirectiveTestComponent>;
    let units: SystemOfUnits;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [QuantityDirective, QuantityDirectiveTestComponent],
            providers: [SystemOfUnits]
        }).compileComponents();

        units = TestBed.inject(SystemOfUnits);
        units.add(new Quantity(length));
        units.add(new Quantity(area));
        units.get('Length').selectUnit('cm');

        fixture = TestBed.createComponent(QuantityDirectiveTestComponent);
        fixture.detectChanges();
    });

    const getInput = (id: string) => fixture.debugElement.query(By.css(id));
    const getValue = (id: string) => getInput(id).nativeElement.value;
    const set = (id: string, value: number) => setInputValue(fixture, getInput(id), value);

    it('should not convert value, if quantity is undefined', async () => {
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(getValue('#by-instance')).toBe('42');
    });

    it('should convert from model by instance', async () => {
        fixture.componentInstance.quantity = new Quantity(length);
        fixture.componentInstance.quantity.selectUnit('cm');
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(getValue('#by-instance')).toBe('4200');
    });

    it('should convert from model by name', async () => {
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(getValue('#by-name')).toBe('4200');
    });

    it('should use unit from ngUnit input', async () => {
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(getValue('#with-unit-name')).toBe('42000');
    });

    it('should watch ngUnit', async () => {
        fixture.componentInstance.unit = 'mm';
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(getValue('#with-unit-binding')).toBe('42000');
    });

    it('should convert back by name', async () => {
        await set('#by-name', 1200);
        expect(fixture.componentInstance.value).toBe(12);
    });

    it('should convert back using unit by name', async () => {
        await set('#with-unit-name', 1200);
        expect(fixture.componentInstance.value).toBe(1.2);
    });

    it('should convert back using unit binding', async () => {
        fixture.componentInstance.unit = 'mm';
        fixture.detectChanges();
        await fixture.whenStable();
        await set('#with-unit-binding', 1200);
        expect(fixture.componentInstance.value).toBe(1.2);
    });

    it('should convert back using unit instance binding', async () => {
        fixture.componentInstance.unit = units.get('Length').findUnit('mm');
        fixture.detectChanges();
        await fixture.whenStable();
        await set('#with-unit-binding', 1200);
        expect(fixture.componentInstance.value).toBe(1.2);
    });
});


async function setInputValue<T>(fixture: ComponentFixture<T>,
    input: DebugElement,
    value: string|number): Promise<DebugElement> {

    input.nativeElement.value = value;
    input.triggerEventHandler('input', { target: input.nativeElement });
    fixture.detectChanges();
    await fixture.whenStable();
    return input;
}
