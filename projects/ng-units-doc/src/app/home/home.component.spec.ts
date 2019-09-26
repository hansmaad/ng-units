import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BasicsComponent } from './basics/basics.component';
import { QuantityPipe, QuantityDirective, NgUnitsModule } from '../../../public_api';
import { FormsModule } from '@angular/forms';
import { SystemOfUnits } from '../modules/ng-units/system-of-units.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgUnitsModule ],
      providers: [SystemOfUnits],
      declarations: [ HomeComponent, BasicsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
