import { QuantityDirective } from './quantity.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemOfUnits } from './system-of-units.service';
import { FormsModule } from '@angular/forms';
import { Quantity } from './quantity';
import { length } from './quantities/length';
import { By } from '@angular/platform-browser';
import { area } from './quantities';


@Component({
    template: `
    <div>
    <input id="by-instance" type="number" [(ngModel)]="value" [ngQuantity]="quantity" >
    <input id="by-name" type="number" [(ngModel)]="value" ngQuantity="Length" >
    </div>
    `
})
class QuantityDirectiveTestComponent {
    value = 1;
    quantity: Quantity;
}

describe('QuantityDirective', () => {

    let fixture: ComponentFixture<QuantityDirectiveTestComponent>;
    let byInstance, byName;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [QuantityDirective, QuantityDirectiveTestComponent],
            providers: [SystemOfUnits]
        }).compileComponents();

        const units = TestBed.inject(SystemOfUnits);
        units.add(new Quantity(length));
        units.add(new Quantity(area));

        fixture = TestBed.createComponent(QuantityDirectiveTestComponent);
        fixture.detectChanges();
        byInstance = fixture.debugElement.query(By.css('#by-instance'));
        byName = fixture.debugElement.query(By.css('#by-name'));
    });

    it('should not convert value, if quantity is undefined', async () => {
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(byInstance.nativeElement.value).toBe('42');
    });

    it('should convert from model by instance', async () => {
        fixture.componentInstance.quantity = new Quantity(length);
        fixture.componentInstance.quantity.selectUnit('cm');
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(byInstance.nativeElement.value).toBe('4200');
    });

    it('should convert from model by name', async () => {
        const units = TestBed.inject(SystemOfUnits);
        units.get('Length').selectUnit('cm');
        fixture.componentInstance.value = 42;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(byName.nativeElement.value).toBe('4200');
    });

});
