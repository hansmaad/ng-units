import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';
import { QuantityDirective } from './quantity.directive';
import { SystemOfUnits } from './system-of-units.service';
import { SystemOfUnitsConfig, systemOfUnitsFactory } from './system-of-units.service.provider';
import { UnitSelectComponent } from './unit-select.component';

export const SYSTEM_OF_UNITS_CONFIGURATION = new InjectionToken<SystemOfUnitsConfig>('SYSTEM_OF_UNITS_CONFIGURATION');

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        QuantityPipe,
        QuantityDirective,
        UnitSelectComponent
    ],
    exports: [
        QuantityPipe,
        QuantityDirective,
        UnitSelectComponent
    ]
})
export class NgUnitsModule {
    static forRoot(config?: SystemOfUnitsConfig): ModuleWithProviders<NgUnitsModule> {
        return {
            ngModule: NgUnitsModule,
            providers: [
                { provide: SYSTEM_OF_UNITS_CONFIGURATION, useValue: config || {} },
                {
                    provide: SystemOfUnits,
                    useFactory: systemOfUnitsFactory,
                    deps: [SYSTEM_OF_UNITS_CONFIGURATION]
                }
            ]
        };
    }
    static forChild(): ModuleWithProviders<NgUnitsModule> {
        return {
            ngModule: NgUnitsModule,
            providers: []
        };
    }
}
