import {  Quantity, QuantityDefinition } from "./quantity";


describe('Quantity', () => {

    let definition: QuantityDefinition;

    beforeEach(() => {
        definition = {
            name: 'Length',
            units: {
                'm' : [1],
                'cm' : [100],
                'awesome' : [10, 10]
            }
        }
    });

    it('should initialize from definition', () => {
        let quantity = new Quantity(definition);
        expect(quantity.name).toBe('Length');
        expect(quantity.unit.symbol).toBe('m');
    });
});