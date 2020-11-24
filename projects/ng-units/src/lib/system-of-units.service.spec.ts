import { TestBed } from '@angular/core/testing';
import { SystemOfUnits } from './system-of-units.service';
import { NgUnitsModule } from './ng-units.module';
import { area, length } from './quantities';


describe('QuantityService', () => {

    let systemOfUnits: SystemOfUnits;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgUnitsModule.forRoot({
                quantities: [length, area]
            })]
        });
        systemOfUnits = TestBed.inject(SystemOfUnits);
    });

    it('selectUnit should trigger change', (done) => {
        const l = systemOfUnits.get('Length');
        const sub = systemOfUnits.changes().subscribe(m => {
            expect(m.quantity).toBe(l);
            sub.unsubscribe();
            done();
        });
        systemOfUnits.selectUnit(l, 'mm');
    });

});
