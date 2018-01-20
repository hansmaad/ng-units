import { QuantityPipe } from './quantity.pipe';

describe('QuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityPipe();
    expect(pipe).toBeTruthy();
  });

  it('should add unit', () => {
    const pipe = new QuantityPipe();
    expect(pipe.transform(100)).toBe('100 unit');
  });

});
