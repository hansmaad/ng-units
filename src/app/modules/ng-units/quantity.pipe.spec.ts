import { QuantityPipe } from './quantity.pipe';
import { Quantity } from '../../../../public_api';
import { length } from './quantities/length';

describe('QuantityPipe', () => {

  let quantity: Quantity;

  beforeEach(() => {
    quantity = new Quantity(length);
    quantity.unit = quantity.units.find(u => u.symbol == 'mm');
  });

  it('create an instance', () => {
    const pipe = new QuantityPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert from base', () => {
    const pipe = new QuantityPipe();
    expect(pipe.transform(2, quantity)).toBe(2000);
  });

});
