import { Quantity, QuantityDefinition } from './quantity';
import { SimpleUnit } from './unit';


describe('Quantity', () => {

    let definition: QuantityDefinition;

    beforeEach(() => {
        definition = {
            name: 'Length',
            units: {
                'm': [1],
                'cm': [100],
                'ΩΩ': [10, 10]
            }
        };
    });

    it('should initialize from definition', () => {
        const quantity = new Quantity(definition);
        expect(quantity.name).toBe('Length');
        expect(quantity.unit.symbol).toBe('m');
    });

    it('should select unit by symbol', () => {
        const quantity = new Quantity(definition);
        quantity.selectUnit('cm');
        expect(quantity.unit.symbol).toBe('cm');
        quantity.selectUnit('cm');
        expect(quantity.unit.symbol).toBe('cm');
        quantity.selectUnit('ΩΩ');
        expect(quantity.unit.symbol).toBe('ΩΩ');
    });

    it('should not select unit by inknown symbol', () => {
        const quantity = new Quantity(definition);
        quantity.selectUnit('cm');
        quantity.selectUnit('meow');
        expect(quantity.unit.symbol).toBe('cm');
    });

    it('should select unit by instance', () => {
        const quantity = new Quantity(definition);
        quantity.selectUnit(quantity.units[1]);
        expect(quantity.unit.symbol).toBe('cm');
        quantity.selectUnit(quantity.units[1]);
        expect(quantity.unit.symbol).toBe('cm');
        quantity.selectUnit(quantity.units[2]);
        expect(quantity.unit.symbol).toBe('ΩΩ');
    });

    it('should not select unknown unit instance', () => {
        const quantity = new Quantity(definition);
        quantity.selectUnit('cm');
        quantity.selectUnit(new SimpleUnit('meow', 1));
        expect(quantity.unit.symbol).toBe('cm');
    });

    describe('print', function () {

        let quantity: Quantity;

        beforeEach(() => {
            quantity = new Quantity(definition);
        });

        function expectPrint(value: number, expectedText: string) {
            const text = quantity.print(value);
            let regex = expectedText.replace(',', '[,\\.]');
            regex = regex.replace('+', '\\+');
            expect(text).toMatch(new RegExp('^' + regex + '$'));
        }

        it('should print integers', function () {
            expectPrint(1, '1');
            expectPrint(-1, '-1');
            expectPrint(100, '100');
            expectPrint(0, '0');
            expectPrint(-0, '0');
        });

        it('should reduce precision', function () {
            expectPrint(0.123456789, '0,123');
            expectPrint(0.0123456789, '0,0123');
            expectPrint(1.0000001, '1');
        });

        it('should print fixed', function () {
            expectPrint(1000.23456, '1000,23');
            expectPrint(1.23456, '1,23');
            expectPrint(10.23456, '10,23');
            expectPrint(102.3456123, '102,35');
        });

        it('should print negative fixed', function () {
            expectPrint(-1000.00111, '-1000');
            expectPrint(-23.023456, '-23,02');
            expectPrint(-2.023456, '-2,02');
        });

        it('should print scientific', function () {
            expectPrint(0.001, '1e-3');
            expectPrint(-0.001, '-1e-3');
            expectPrint(0.00101, '1,01e-3');
            expectPrint(0.000012345678, '1,235e-5');
            expectPrint(100000, '1e+5');
            expectPrint(100200, '1,002e+5');
            expectPrint(100020, '1e+5');
            expectPrint(100002, '1e+5');
            expectPrint(100090, '1,001e+5');
            expectPrint(102000, '1,02e+5');
            expectPrint(-123456789, '-1,235e+8');
        });

        it('should return empty if not a number', function () {
            expect(quantity.print(undefined)).toEqual('');
            expect(quantity.print(null)).toEqual('');
            expect(quantity.print('')).toEqual('');
        });

        it('should use custom formatter', function () {
            quantity.formatter = value => value + 'meow';
            const text = quantity.print(123);
            expect(text).toBe('123meow');
        });
    });

    describe('toBase', function () {
        let quantity: Quantity;

        beforeEach(() => {
            quantity = new Quantity(definition);
            quantity.selectUnit('cm');
        });

        it('should convert from number', function () {
            expect(quantity.toBase(2)).toBe(0.02);
        });

        it('should convert from string', function () {
            expect(quantity.toBase('2')).toBe(0.02);
            expect(quantity.toBase('2.0')).toBe(0.02);
            expect(quantity.toBase('2,0')).toBe(0.02);
        });

        it('should convert undefined to null', function () {
            expect(quantity.toBase(undefined)).toBe(null);
        });

        it('should convert null to null', function () {
            expect(quantity.toBase(null)).toBe(null);
        });

        it('should convert empty string to null', function () {
            expect(quantity.toBase('')).toBe(null);
        });

        it('should convert text to null', function () {
            expect(quantity.toBase('abc')).toBe(null);
        });

        it('should convert from scientifc notation', function () {
            expect(quantity.toBase('2e2')).toBe(2);
            expect(quantity.toBase('2.0e2')).toBe(2);
            expect(quantity.toBase('2,0e2')).toBe(2);
            expect(quantity.toBase('2,0e02')).toBe(2);
            expect(quantity.toBase('2,0e+02')).toBe(2);
            expect(quantity.toBase('2,0E2')).toBe(2);

            expect(quantity.toBase('2e-2')).toBe(2e-4);
            expect(quantity.toBase('2e-02')).toBe(2e-4);
            expect(quantity.toBase('2.0e-2')).toBe(2e-4);
            expect(quantity.toBase('2,0e-2')).toBe(2e-4);
            expect(quantity.toBase('2.0e-02')).toBe(2e-4);
            expect(quantity.toBase('2,0e-02')).toBe(2e-4);
        });

        it('should use a custom parser', () => {
            quantity.parser = value => +(value || 0) * 2;
            expect(quantity.toBase('2')).toBe(0.04);
        });
    });

    describe('fromBase', function () {
        let quantity: Quantity;

        beforeEach(() => {
            quantity = new Quantity(definition);
            quantity.selectUnit('cm');
        });

        it('should convert from number', function () {
            expect(quantity.fromBase(2)).toBe(200);
        });

        it('should convert from string', function () {
            expect(quantity.fromBase('2')).toBe(200);
            expect(quantity.fromBase('2.0')).toBe(200);
            expect(quantity.fromBase('2,0')).toBe(200);
        });

        it('should convert undefined to null', function () {
            expect(quantity.fromBase(undefined)).toBe(null);
        });

        it('should convert null to null', function () {
            expect(quantity.fromBase(null)).toBe(null);
        });

        it('should convert empty string to null', function () {
            expect(quantity.fromBase('')).toBe(null);
        });

        it('should convert text to null', function () {
            expect(quantity.fromBase('abc')).toBe(null);
        });

        it('should convert from scientifc notation', function () {
            expect(quantity.fromBase('2e2')).toBe(20000);
            expect(quantity.fromBase('2.0e2')).toBe(20000);
            expect(quantity.fromBase('2,0e2')).toBe(20000);

            expect(quantity.fromBase('2e-2')).toBe(2);
            expect(quantity.fromBase('2e-02')).toBe(2);
            expect(quantity.fromBase('2.0e-2')).toBe(2);
            expect(quantity.fromBase('2,0e-2')).toBe(2);
            expect(quantity.fromBase('2.0e-02')).toBe(2);
            expect(quantity.fromBase('2,0e-02')).toBe(2);
        });

        it('should use a custom parser', () => {
            quantity.parser = value => {
                if (value === '2') {
                    return 222;
                }
                return null;
            };
            const value = quantity.fromBase('2');
            expect(value).toBe(22200);
        });
    });

    describe('findUnit', () => {
        let quantity: Quantity;

        beforeEach(() => {
            // Create a new instance of Quantity for each test case
            quantity = new Quantity();
            quantity.units = [
                new SimpleUnit('m', 1, 0),
                new SimpleUnit('cm', 0.01, 0),
                new SimpleUnit('ft', 0.3048, 0),
            ];
        });

        it('should return undefined if no unit is provided', () => {
            const result = quantity.findUnit(undefined);
            expect(result).toBeUndefined();
        });

        it('should return the unit if it exists in the units array', () => {
            const unit = new SimpleUnit('m', 1, 0);
            const result = quantity.findUnit(unit);
            expect(result).toEqual(unit);
        });

        it('should return undefined if the unit does not exist in the units array', () => {
            const unit = new SimpleUnit('km', 1000, 0);
            const result = quantity.findUnit(unit);
            expect(result).toBeUndefined();
        });

        it('should return the unit with the matching symbol', () => {
            const symbol = 'ft';
            const result = quantity.findUnit(symbol);
            expect(result?.symbol).toEqual(symbol);
        });

        it('should return undefined if the unit symbol is an empty string', () => {
            const symbol = '';
            const result = quantity.findUnit(symbol);
            expect(result).toBeUndefined();
        });
    });
});
