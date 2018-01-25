import { QuantityPipe } from './quantity.pipe';
import { Quantity } from './quantity';
import { length } from './quantities/length';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SystemOfUnits } from './system-of-units.service';



@Component({
    template: `
    <div>{{ value | ngQuantity:quantity:true}}</div>`
})
class QuantityPipeTestComponent { 
    value = 1;
    quantity;
}

describe('QuantityPipe', () => {

    let quantity: Quantity;
    let pipe: QuantityPipe;

    beforeEach(() => {
        pipe = new QuantityPipe(new SystemOfUnits());
        quantity = new Quantity(length);
        quantity.selectUnit('mm');
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should do nothing if quantity is undefined', () => {
        expect(pipe.transform(2)).toBe(2);
    });

    it('should convert from base', () => {
        expect(pipe.transform(2, quantity)).toBe('2000');
    });

    it('should add unit symbol', () => {
        expect(pipe.transform(2, quantity, true)).toBe('2000 mm');
    })

    it('should use quantity formatter', () => {
        quantity.formatter = (v) => v + 'meow'
        expect(pipe.transform(2, quantity)).toBe('2000meow');
        expect(pipe.transform(2, quantity, true)).toBe('2000meow mm');
    })

    describe('changeDetection', () => {
    
        let fixture: ComponentFixture<QuantityPipeTestComponent>;
        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                declarations: [ QuantityPipe, QuantityPipeTestComponent ],
                providers: [SystemOfUnits]
              })
              .createComponent(QuantityPipeTestComponent);
              fixture.detectChanges(); 
        });
    
        it('should render', () => {
            expect(fixture.debugElement.nativeElement.textContent).toContain('1');
        });

        it('should render on quantity change', () => {
            fixture.componentInstance.quantity = quantity;
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.textContent).toContain('1000 mm');
        });

        it('should render on unit change', () => {
            fixture.componentInstance.quantity = quantity;
            fixture.detectChanges();
            fixture.componentInstance.quantity.selectUnit('cm');
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.textContent).toContain('100 cm');
        });
    });
});



