import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BasicsComponent } from './basics/basics.component';
import { QuantityPipe, QuantityDirective } from '../../../public_api';
import { FormsModule } from '@angular/forms';
import { SystemOfUnits } from '../modules/ng-units/system-of-units.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [SystemOfUnits],
      declarations: [ HomeComponent, BasicsComponent, QuantityPipe, QuantityDirective]
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
