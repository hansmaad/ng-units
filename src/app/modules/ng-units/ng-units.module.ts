import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityPipe } from './quantity.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuantityPipe],
  exports: [
    QuantityPipe
  ]
})
export class NgUnitsModule { }
