import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsComponent } from './basics.component';
import { FormsModule } from '@angular/forms';
import { SystemOfUnits, NgUnitsModule } from '../../../../public_api';

describe('BasicsComponent', () => {
  let component: BasicsComponent;
  let fixture: ComponentFixture<BasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgUnitsModule ],
      declarations: [ BasicsComponent ],
      providers: [ SystemOfUnits ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should render 1250 mm', async(() => {
    const fixture = TestBed.createComponent(BasicsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#pipe-test-1').textContent).toContain('1250 mm');
  }));
});
