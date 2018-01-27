import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';
import { QuantityDirective } from './quantity.directive';
import { SystemOfUnits } from './system-of-units.service';
import { SystemOfUnitsInitializer, systemOfUnitsProvider } from './system-of-units.service.provider';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        QuantityPipe,
        QuantityDirective
    ],
    exports: [
        QuantityPipe,
        QuantityDirective
    ]
})
export class NgUnitsModule {
    static forRoot(initializer?: SystemOfUnitsInitializer): ModuleWithProviders {
        return {
            ngModule: NgUnitsModule,
            providers: [systemOfUnitsProvider(initializer)]
        }
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: NgUnitsModule,
            providers: []
        }
    }
}
