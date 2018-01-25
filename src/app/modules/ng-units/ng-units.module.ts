import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';
import { QuantityDirective } from './quantity.directive';
import { SystemOfUnits } from './system-of-units.service';

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
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgUnitsModule,
            providers: [SystemOfUnits]
        }
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: NgUnitsModule,
            providers: []
        }
    }
}
