import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuantityPipe, QuantityDirective, SystemOfUnits } from '../../public_api';
import { BasicsComponent } from './home/basics/basics.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, AppRoutingModule ],
      declarations: [
        AppComponent, HomeComponent, PageNotFoundComponent, QuantityPipe, QuantityDirective, BasicsComponent
      ],
      providers: [ SystemOfUnits ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
