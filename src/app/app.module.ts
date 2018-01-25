import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgUnitsModule, QuantityService } from '../../public_api';
import { BasicsComponent } from './getting-started/basics/basics.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgUnitsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
