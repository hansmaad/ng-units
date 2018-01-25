import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';
import { QuantityService } from './quantity.service';
import { QuantityDirective } from './quantity.directive';

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
            providers: [QuantityService]
        }
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: NgUnitsModule,
            providers: []
        }
    }
}
