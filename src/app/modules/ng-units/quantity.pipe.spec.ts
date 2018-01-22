import { QuantityPipe } from './quantity.pipe';
import { Quantity } from './quantity';
import { length } from './quantities/length';

describe('QuantityPipe', () => {

    let quantity: Quantity;
    let pipe: QuantityPipe;

    beforeEach(() => {
        pipe = new QuantityPipe();
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

});
