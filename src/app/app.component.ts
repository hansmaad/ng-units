import { Component } from '@angular/core';
import { Quantity, length } from '../../public_api';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng';
  quantity = new Quantity(length);

  constructor() {
    
  }
}
