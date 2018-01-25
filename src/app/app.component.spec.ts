import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuantityPipe, QuantityDirective, QuantityService } from '../../public_api';
import { BasicsComponent } from './getting-started/basics/basics.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent, QuantityPipe, QuantityDirective, BasicsComponent
      ],
      providers: [ QuantityService ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render 1.23e+5 mm', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#pipe-test-1').textContent).toContain('1.23e+5 mm');
  }));
});
