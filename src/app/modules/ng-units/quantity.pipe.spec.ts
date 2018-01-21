import { QuantityPipe } from './quantity.pipe';
import { Quantity } from '../../../../public_api';
import { length } from './quantities/length';

describe('QuantityPipe', () => {

  let quantity: Quantity;
  let pipe: QuantityPipe;

  beforeEach(() => {
    pipe = new QuantityPipe();
    quantity = new Quantity(length);
    quantity.unit = quantity.units.find(u => u.symbol == 'mm');
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert from base', () => {
    expect(pipe.transform(2, quantity)).toBe('2000');
  });

  it('should add unit symbol', () => {
    expect(pipe.transform(2, quantity, true)).toBe('2000 mm');
  })

});
