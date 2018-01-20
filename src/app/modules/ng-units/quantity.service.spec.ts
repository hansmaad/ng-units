import { TestBed, inject } from '@angular/core/testing';

import { QuantityService } from './quantity.service';

describe('QuantityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuantityService]
    });
  });

  it('should be created', inject([QuantityService], (service: QuantityService) => {
    expect(service).toBeTruthy();
  }));
});
