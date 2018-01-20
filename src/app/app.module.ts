import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgUnitsModule } from './modules/ng-units/ng-units.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgUnitsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
