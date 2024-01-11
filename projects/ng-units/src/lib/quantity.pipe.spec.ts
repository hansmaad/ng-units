import { QuantityPipe } from './quantity.pipe';
import { Quantity } from './quantity';
import { length } from './quantities/length';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SystemOfUnits } from './system-of-units.service';



@Component({
    template: `
    <div>
        <div id="by-instance">{{ value | ngQuantity:quantity:true}}</div>
        <div id="by-name">{{ value | ngQuantity:'Length'}}</div>
    </div>
    `
})
class QuantityPipeTestComponent {
    value = 1;
    quantity?: Quantity|string;
}

describe('QuantityPipe', () => {

    let quantity: Quantity;
    let pipe: QuantityPipe;
    let systemOfUnits: SystemOfUnits;

    beforeEach(() => {
        systemOfUnits = new SystemOfUnits();
        pipe = new QuantityPipe(systemOfUnits);
        quantity = new Quantity(length);
        quantity.selectUnit('mm');
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should do return as string if quantity is undefined', () => {
        expect(pipe.transform(2)).toBe('2');
    });

    it('should use default formatter if quantity is undefined', () => {
        expect(pipe.transform(0.000001)).toBe('1e-6');
    });

    it('should convert from base', () => {
        expect(pipe.transform(2, quantity)).toBe('2000');
    });

    it('should convert string argument', () => {
        expect(pipe.transform('2', quantity)).toBe('2000');
    });

    it('should add unit symbol', () => {
        expect(pipe.transform(2, quantity, true)).toBe('2000 mm');
    });

    it('should add unit symbol to 0', () => {
        expect(pipe.transform(0, quantity, true)).toBe('0 mm');
    });

    it('should return unit symbol only if value is undefined', () => {
        expect(pipe.transform(undefined, quantity, true)).toBe('mm');
    });

    it('should return unit symbol only if value is null', () => {
        expect(pipe.transform(null, quantity, true)).toBe('mm');
    });

    it('should return argument if quantity name is not in system of units', () => {
        expect(pipe.transform(2.5, 'length')).toBe('2.5');
    });

    it('should return string argument if quantity name is not in system of units', () => {
        expect(pipe.transform('2.5', 'length')).toBe('2.5');
    });

    it('should convert if quantity name is in system of units', () => {
        const q = new Quantity(length);
        systemOfUnits.add(q);
        q.selectUnit('cm');
        expect(pipe.transform(2.5, 'Length')).toBe('250');
    });

    it('should add unit symbol if quantity name is in system of units', () => {
        const q = new Quantity(length);
        systemOfUnits.add(q);
        q.selectUnit('cm');
        expect(pipe.transform(2.5, 'Length', true)).toBe('250 cm');
    });


    it('should use quantity formatter', () => {
        quantity.formatter = (v) => v + 'meow';
        expect(pipe.transform(2, quantity)).toBe('2000meow');
        expect(pipe.transform(2, quantity, true)).toBe('2000meow mm');
    });

    it('should use specific unit by name without symbol', () => {
        expect(pipe.transform(2, quantity, 'cm')).toBe('200');
    });

    it('should use specific unit by name with symbol', () => {
        expect(pipe.transform(2, quantity, 'cm', true)).toBe('200 cm');
    });

    it('should use specific unit without symbol', () => {
        expect(pipe.transform(2, quantity, quantity.findUnit('cm'))).toBe('200');
    });

    it('should use specific unit with symbol', () => {
        expect(pipe.transform(2, quantity, quantity.findUnit('cm'), true)).toBe('200 cm');
    });

    it('should print specific unit symbol', () => {
        expect(pipe.transform(null, quantity, 'cm', true)).toBe('cm');
    });

    it('should fallback to selected unit if does not exist', () => {
        expect(pipe.transform(2, quantity, 'cm2', true)).toBe('2000 mm');
    });

    describe('changeDetection', () => {

        let systemQuantity: Quantity;
        let fixture: ComponentFixture<QuantityPipeTestComponent>;
        let byInstance: Element;
        let byName: Element;
        beforeEach(() => {
            systemQuantity = new Quantity(length);
            systemOfUnits.add(systemQuantity);
            fixture = TestBed.configureTestingModule({
                declarations: [ QuantityPipe, QuantityPipeTestComponent ],
                providers: [{
                    provide: SystemOfUnits,
                    useValue: systemOfUnits
                }]
              })
              .createComponent(QuantityPipeTestComponent);
              fixture.detectChanges();
              byInstance = fixture.nativeElement.querySelector('#by-instance');
              byName = fixture.nativeElement.querySelector('#by-name');
        });

        it('should render', () => {
            expect(byInstance.textContent).toContain('1');
            expect(byName.textContent).toContain('1');
        });

        it('should render on quantity change', () => {
            fixture.componentInstance.quantity = quantity;
            fixture.detectChanges();
            expect(byInstance.textContent).toContain('1000 mm');
        });

        it('should render on unit change for passed by instance', () => {
            fixture.componentInstance.quantity = quantity;
            fixture.detectChanges();
            fixture.componentInstance.quantity.selectUnit('cm');
            fixture.detectChanges();
            expect(byInstance.textContent).toContain('100 cm');
        });

        it('should render on unit change for passed by name', () => {
            systemQuantity.selectUnit('cm');
            fixture.detectChanges();
            expect(byName.textContent).toContain('100');
        });
    });
});



