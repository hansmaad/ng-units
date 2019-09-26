import { TestBed, inject } from '@angular/core/testing';
import { length } from './quantities/length';
import { SystemOfUnits } from './system-of-units.service';

describe('QuantityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemOfUnits]
    });
  });

  it('should be created', inject([SystemOfUnits], (service: SystemOfUnits) => {
    expect(service).toBeTruthy();
  }));
});
