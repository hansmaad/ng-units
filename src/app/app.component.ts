import { Component } from '@angular/core';
import { Quantity, length, SystemOfUnits } from '../../public_api';


@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {

  constructor(systemOfUnits: SystemOfUnits) {
  }

}
