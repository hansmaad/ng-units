import { QuantityPipe } from './quantity.pipe';
import { Quantity } from '../../../../public_api';

describe('QuantityPipe', () => {

  let quantity: Quantity;

  beforeEach(() => {
    quantity = new Quantity();
    let unit = {
      fromBase: (v) => {
        return 2*v;
      }
    }
    quantity.units.push(unit);
    quantity.unit = unit;

  });

  it('create an instance', () => {
    const pipe = new QuantityPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert from base', () => {
    const pipe = new QuantityPipe();
    expect(pipe.transform(100, quantity)).toBe(200);
  });

});
