import { Component } from '@angular/core';
import { Quantity } from '../../public_api';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng';
  quantity = new Quantity();

  constructor() {
    let unit = {
      fromBase: (v) => {
        return 2*v;
      }
    }
    this.quantity.units.push(unit);
    this.quantity.unit = unit;
  }
}
