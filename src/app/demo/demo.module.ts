import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { MainComponent } from './main/main.component';
import { NgUnitsModule } from '../../../public_api';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoRoutingModule,
    NgUnitsModule.forChild()
  ],
  declarations: [DemoComponent, MainComponent]
})
export class DemoModule { }
