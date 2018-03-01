import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSelectComponent } from './unit-select.component';
import { FormsModule } from '@angular/forms';
import { SystemOfUnits } from './system-of-units.service';

describe('UnitSelectComponent', () => {
  let component: UnitSelectComponent;
  let fixture: ComponentFixture<UnitSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ UnitSelectComponent ],
      providers: [SystemOfUnits]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
