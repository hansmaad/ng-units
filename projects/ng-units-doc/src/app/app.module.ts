import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgUnitsModule } from 'ng-units';
import { BasicsComponent } from './home/basics/basics.component';
import { systemOfUnitsInitializer } from './system-of-units-initializer';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DemoModule } from './demo/demo.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasicsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgUnitsModule.forRoot(systemOfUnitsInitializer()),
    DemoModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
