import { Injectable } from '@angular/core';
import { Quantity } from './quantity';

@Injectable()
export class QuantityService {

  quantities: Quantity[] = [];

  constructor() { }

  get(quantityName: string): Quantity {
    let quantity = this.quantities.find(q => q.name === quantityName);
    return quantity;
  }

}
