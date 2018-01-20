import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';
import { QuantityService } from './quantity.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuantityPipe],
  exports: [
    QuantityPipe
  ]
})
export class NgUnitsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgUnitsModule,
      providers: [QuantityService]
    }
  }

 }
