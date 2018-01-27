import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgUnitsModule } from '../../public_api';
import { BasicsComponent } from './getting-started/basics/basics.component';
import { systemOfUnitsInitializer } from './system-of-units-initializer';


@NgModule({
  declarations: [
    AppComponent,
    BasicsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgUnitsModule.forRoot(systemOfUnitsInitializer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
